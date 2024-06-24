import { successResponseSchema } from "@/lib/apiResponse";
import { VisitRecordSchema, climbingCenterSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getClimbCenters = async () => {
  const res = await fetch(`${BASE_URL}/api/climb-center`);

  if (!res.ok) {
    console.error("Failed to fetch climb centers");
    return [];
  }

  try {
    const body = await res.json();
    const parsedBody = successResponseSchema.parse(body);
    const data = climbingCenterSchema.array().parse(parsedBody.data);

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getClimbCenter = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/climb-center/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch climb center");
  }

  try {
    const body = await response.json();
    const parsedBody = successResponseSchema.parse(body);
    const data = climbingCenterSchema.parse(parsedBody.data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVisitRecords = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("climb_center_visit").select(
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
  );

  if (error) {
    console.error("supabase Error", error);
    return [];
  }

  return VisitRecordSchema.array().parse(data);
};
