import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { applications, developerProfiles, founderProfiles } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const applicationRouter = createTRPCRouter({
  /**
   * Get all applications sent by a specific developerId with related data
   */
  create: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        developerId: z.string(),
        coverLetter: z.string().min(1, "Cover letter is required"),
      })
    )
    .mutation(async ({  input , ctx }) => {
      // Ensure the developer exists
      const developer = await ctx.db.query.developerProfiles.findFirst({
        where: (dev) =>eq(dev.userId, input.developerId),
      });
      if (!developer) {
        return "Developer not found";
      }

      // Ensure the project exists
      const project = await ctx.db.query.founderProfiles.findFirst({
        where: (proj) => eq(proj.userId, input.projectId),
      });
      if (!project) {
return null
      }

      // Check if the application already exists for this project and developer
      const existingApplication = await ctx.db.query.applications.findFirst({
        where: (app) =>
          eq(app.projectId, input.projectId) && eq(app.developerId, input.developerId),
      });

      if (existingApplication) {
        return "existing application";
      }

      // Create the new application
      const newApplication = await ctx.db.insert(applications).values({
        projectId: input.projectId,
        developerId: input.developerId,
        coverLetter: input.coverLetter,
      });

      return {
        success: true,
        message: "Application submitted successfully!",
        application: newApplication,
      };
    }),
  getByDeveloperId: publicProcedure
    .input(z.object({ developerId: z.string() }))
    .query(async ({ input , ctx}) => {
      const apps = await ctx.db
        .select({
          application: applications,
          project: founderProfiles,
          developer: developerProfiles,
        })
        .from(applications)
        .leftJoin(
          founderProfiles,
        eq(applications.projectId, founderProfiles.userId)
        )
        .leftJoin(
          developerProfiles,
eq(applications.developerId, developerProfiles.userId)
        )
        .where(eq(applications.developerId, input.developerId));
        if(apps){


      return apps.map((row) => ({
        id: row.application.id,
        coverLetter: row.application.coverLetter,
        createdAt: row.application.createdAt,
        updatedAt: row.application.updatedAt,
        project: {
          id: row.project!.id,
          userId: row.project!.userId,
          userName: row.project!.userName,
          startupName: row.project!.startupName,
          description: row.project!.description,
          stage: row.project!.stage,
          requirements: row.project!.requirements,
          budget: row.project!.budget,
          pitchDeck: row.project!.pitchDeck,
        },
        developer: {
          id: row.developer!.id,
          userId: row.developer!.userId,
          userName: row.developer!.userName,
          skills: row.developer!.skills,
          experienceLevel: row.developer!.experienceLevel,
          githubLink: row.developer!.githubLink,
          portfolioLinks: row.developer!.portfolioLinks,
          availability: row.developer!.availability,
        },
      }));
    }
    return [];
    }),

  /**
   * Get all applications received by a specific projectId with related data
   */
  getByProjectId: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const apps = await db
        .select({
          application: applications,
          project: founderProfiles,
          developer: developerProfiles,
        })
        .from(applications)
        .leftJoin(
          founderProfiles,
eq(applications.projectId, founderProfiles.userId)
        )
        .leftJoin(
          developerProfiles,
eq(applications.developerId, developerProfiles.userId)
        )
        .where(eq(applications.projectId, input.projectId));    
if(apps){


      return apps.map((row) => ({
        id: row.application.id,
        coverLetter: row.application.coverLetter,
        createdAt: row.application.createdAt,
        updatedAt: row.application.updatedAt,
        project: {
          id: row.project!.id,
          userId: row.project!.userId,
          userName: row.project!.userName,
          startupName: row.project!.startupName,
          description: row.project!.description,
          stage: row.project!.stage,
          requirements: row.project!.requirements,
          budget: row.project!.budget,
          pitchDeck: row.project!.pitchDeck,
        },
        developer: {
          id: row.developer!.id,
          userId: row.developer!.userId,
          userName: row.developer!.userName,
          skills: row.developer!.skills,
          experienceLevel: row.developer!.experienceLevel,
          githubLink: row.developer!.githubLink,
          portfolioLinks: row.developer!.portfolioLinks,
          availability: row.developer!.availability,
        },
      }));
}
return [];
    }),
});