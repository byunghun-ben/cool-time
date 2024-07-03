import { errorResponseSchema, successResponseSchema } from "@/lib/apiResponse";
import { getURL } from "@/lib/utils";
import { VisitRecordSchema, climbingCenterSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/auth-js";

const BASE_URL = getURL();

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("supabase Error:getUser", error);
    return null;
  }

  return user as User;
};

export const getClimbCenters = async () => {
  const res = await fetch(`${BASE_URL}/api/climb-center`);

  if (!res.ok) {
    const errorBody = errorResponseSchema.parse(await res.json());
    console.error("Failed to fetch climb centers", errorBody);
    return [];
  }

  const { data } = successResponseSchema.parse(await res.json());
  const climbCenters = climbingCenterSchema.array().parse(data);

  return climbCenters;
  // const supabase = createClient();

  // const { data, error } = await supabase.from("climb_center").select(`
  //   id,
  //   name,
  //   address,
  //   brandId:brand_id,
  //   instagramUrl:instagram_url,
  //   sectors:climb_center_sector (
  //     id,
  //     name,
  //     climbCenterId:climb_center_id,
  //     settingHistory:climb_center_sector_setting (
  //       id,
  //       sectorId:sector_id,
  //       settingDate:setting_date
  //     )
  //   ),
  //   brand:climb_brand (
  //     id,
  //     name
  //   )
  // `);

  // if (error) {
  //   console.error("supabase Error:getClimbCenters", error);
  //   return [];
  // }

  // try {
  //   return climbingCenterSchema.array().parse(data);
  // } catch (error) {
  //   console.error("Error parsing response", data);
  //   return [];
  // }
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
