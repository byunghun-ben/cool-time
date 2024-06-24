import { z } from "zod";

export const VisitRecordSchema = z.object({
  id: z.number(),
  climbCenterId: z.number(),
  visitDate: z.string(),
  userId: z.string().optional(),
  climbCenter: z.object({
    id: z.number(),
    name: z.string(),
  }),
});
