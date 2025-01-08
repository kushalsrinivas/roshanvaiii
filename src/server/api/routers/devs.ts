import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { developerProfiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const devRouter = createTRPCRouter({
  /**
   * Get a developer profile by ID (Public Route)
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.developerProfiles.findFirst({
        where: (profiles) => eq(profiles.userId, input.id),
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    }),

  /**
   * Get all developer profiles (Public Route)
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const profiles = await ctx.db.query.developerProfiles.findMany();

    return profiles;
  }),
  create: publicProcedure
  .input(
    z.object({
      userName : z.string(),
            userId: z.string(),
      skills: z.array(z.string()).min(1),
      experienceLevel: z.string(),
      githubLink: z.string().url(),
      portfolioLinks: z.string().optional(),
      availability: z.string(),

    })
  )
  .mutation(async ({ ctx, input }) => {
    // Check if a profile already exists for the user
    const existingProfile = await ctx.db.query.developerProfiles.findFirst({
      where: (profiles) => eq(profiles.createdById, input.userId),
    });

    if (existingProfile) {
      throw new Error("Developer profile already exists.");
    }

    // Create a new developer profile
    const newProfile = await ctx.db.insert(developerProfiles).values({
      userName : input.userName,
      skills: input.skills,
      experienceLevel: input.experienceLevel,
      githubLink: input.githubLink,
      portfolioLinks: input.portfolioLinks,
      availability: input.availability,
      userId : input.userId,
      createdById: input.userId, // Associate with authenticated user
    });

    return { success: true, profile: newProfile };
  }),

    /**
   * Update a developer profile by ID (Public Route)
   */
   
});