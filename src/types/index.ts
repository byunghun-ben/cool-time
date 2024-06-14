import { VisitRecordSchema } from "@/schemas";
import { z } from "zod";

export type VisitRecord = z.infer<typeof VisitRecordSchema>;
