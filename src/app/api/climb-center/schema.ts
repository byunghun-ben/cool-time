import { z } from "zod";

export const climbCenterSectorSettingSchema = z.object({
  id: z.number(),
  sector_id: z.number(),
  setting_date: z.string(),
});

export const climbCenterSectorSchema = z.object({
  id: z.number(),
  name: z.string(),
  climb_center_id: z.number(),
  climb_center_sector_setting: z.array(climbCenterSectorSettingSchema),
});

export const climbingCenterSchema = z.object({
  id: z.number(),
  name: z.string(),
  climb_center_sector: z.array(climbCenterSectorSchema),
});
