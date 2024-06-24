import {
  VisitRecordSchema,
  climbCenterSectorSchema,
  climbingCenterSchema,
} from "@/schemas";
import { z } from "zod";

export type VisitRecord = z.infer<typeof VisitRecordSchema>;

export type ClimbCenter = z.infer<typeof climbingCenterSchema>;
export type ClimbCenterSector = z.infer<typeof climbCenterSectorSchema>;
