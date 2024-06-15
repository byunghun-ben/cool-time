import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import { successResponseSchema } from "@/lib/apiResponse";

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
