import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { founderProfiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const founderRouter = createTRPCRouter({
  /**
   * Get all founder profiles (Public)
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const profiles = await ctx.db.query.founderProfiles.findMany();
    return profiles;
  }),

  /**
   * Get a specific founder profile by ID (Public)
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.founderProfiles.findFirst({
        where: (profiles) => eq(profiles.userId,input.id ),
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    }),

  /**
   * Create a new founder profile (Protected)
   */
  create: protectedProcedure
    .input(
      z.object({
        userName : z.string(),        userId : z.string(),
        startupName: z.string().min(1),
        description: z.string().min(1),
        stage: z.string(),
        requirements: z.string().min(1),
        budget: z.string(),
        pitchDeck: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if a profile already exists for the user
      const existingProfile = await ctx.db.query.founderProfiles.findFirst({
        where: (profiles) => eq(profiles.createdById, input.userId),
      });

      if (existingProfile) {
        throw new Error("Founder profile already exists.");
      }

      // Create the new profile
      const newProfile = await ctx.db.insert(founderProfiles).values({
        userName : input.userName,
        userId: input.userId,
        startupName: input.startupName,
        description: input.description,
        stage: input.stage,
        requirements: input.requirements,
        budget: input.budget,
        pitchDeck: input.pitchDeck,
        createdById: ctx.session.user.id, // Authenticated user ID
      });

      return { success: true, profile: newProfile };
    }),
});