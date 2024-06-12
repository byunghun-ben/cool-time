import { z } from "zod";

export const climbCenterSectorSchema = z.object({
  id: z.number(),
  name: z.string(),
  climb_center_id: z.number(),
});

export const climbingCenterSchema = z.object({
  id: z.number(),
  name: z.string(),
  climb_center_sector: z.array(climbCenterSectorSchema),
});
