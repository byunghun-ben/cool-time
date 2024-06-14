import { z } from "zod";

export const VisitRecordSchema = z.object({
  id: z.string(),
  climbCenterId: z.number(),
  visitDate: z.date(),
});
