"use server";

import { createClient } from "@/utils/supabase/server";

export const createSectorSetting = async (
  sectorId: number,
  settingDate: string
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("climb_center_sector_setting")
    .insert([
      {
        sector_id: sectorId,
        setting_date: settingDate,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteClimbSectorSetting = async (
  climbSectorSettingId: number
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("climb_center_sector_setting")
    .delete()
    .eq("id", climbSectorSettingId);

  if (error) {
    throw new Error(error.message);
  }
};

export const createSector = async (climbCenterId: number, name: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("climb_center_sector")
    .insert([
      {
        climb_center_id: climbCenterId,
        name,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
