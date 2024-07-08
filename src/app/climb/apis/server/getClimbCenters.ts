import { climbingCenterSchema } from "@/schemas";
import { createClientWithoutCookies } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import "server-only";

const getClimbCenters = cache(async () => {
  const supabase = createClientWithoutCookies();

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
      name,
      logoUrl:logo_url
    )
  `);

  if (error) {
    console.error("supabase Error:getClimbCenters", error);
    return [];
  }

  try {
    return climbingCenterSchema.array().parse(data);
  } catch (error) {
    console.error("Error parsing response", data);
    return [];
  }
});

export default unstable_cache(getClimbCenters, ["getClimbCenters"]);
