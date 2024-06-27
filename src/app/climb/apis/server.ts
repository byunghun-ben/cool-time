import { VisitRecordSchema, climbingCenterSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";

export const getClimbCenters = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("climb_center").select(`
    id,
    name,
    address,
    brandId:brand_id,
    instagramUrl:instagram_url,
    sectors:climb_center_sector (
      id,
      name,
      climbCenterId:climb_center_id,
      settingHistory:climb_center_sector_setting (
        id,
        sectorId:sector_id,
        settingDate:setting_date
      )
    ),
    brand:climb_brand (
      id,
      name
    )
  `);

  if (error) {
    console.error("supabase Error", error);
    return [];
  }

  try {
    return climbingCenterSchema.array().parse(data);
  } catch (error) {
    console.error("Error parsing response", data);
    return [];
  }
};

export const getClimbCenter = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("climb_center")
    .select(
      `
      id,
      name,
      address,
      brandId:brand_id,
      instagramUrl:instagram_url,
      sectors:climb_center_sector (
        id,
        name,
        climbCenterId:climb_center_id,
        settingHistory:climb_center_sector_setting (
          id,
          sectorId:sector_id,
          settingDate:setting_date
        )
      ),
      brand:climb_brand (
        id,
        name
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("supabase Error", error);
    return null;
  }

  try {
    return climbingCenterSchema.parse(data);
  } catch (error) {
    console.error("Error parsing response", data);
    return null;
  }
};

export const getVisitRecords = async ({ userId }: { userId?: string }) => {
  if (!userId) {
    return [];
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("climb_center_visit")
    .select(
      `
      id,
      climbCenterId:climb_center_id,
      userId:user_id,
      visitDate:visit_date,
      climbCenter:climb_center(
        id,
        name
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("supabase Error", error);
    return [];
  }

  return VisitRecordSchema.array().parse(data);
};
