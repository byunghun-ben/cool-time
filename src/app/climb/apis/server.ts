import { VisitRecordSchema, climbingCenterSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/auth-js";
import { cache } from "react";
import "server-only";

export const getUser = async () => {
  const supabase = createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      return null;
    }
    return user as User;
  } catch (error) {
    console.error("왜 에러가 나는거지?", error);
    return null;
  }
};

export const getClimbCenter = cache(async (id: number) => {
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
        name,
        logoUrl:logo_url
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("getClimbCenter", "supabase Error", error);
    return null;
  }

  try {
    return climbingCenterSchema.parse(data);
  } catch (error) {
    console.error("Error parsing response", data);
    return null;
  }
});

export const getVisitRecords = cache(
  async ({ userId }: { userId?: string }) => {
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
      console.error("123 supabase Error", error);
      return [];
    }

    return VisitRecordSchema.array().parse(data);
  }
);
