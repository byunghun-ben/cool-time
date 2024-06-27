import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const postRequestBodySchema = z.object({
  userId: z.string(),
  climbCenterId: z.number(),
  visitDate: z.string(),
});

export const POST = async (req: Request) => {
  const requestBody = await req.json();
  const { userId, climbCenterId, visitDate } =
    postRequestBodySchema.parse(requestBody);

  const supabase = createClient();

  const { error } = await supabase.from("climb_center_visit").insert([
    {
      user_id: userId,
      climb_center_id: climbCenterId,
      visit_date: visitDate,
    },
  ]);

  if (error) {
    return createErrorResponse(error.message);
  }

  return createSuccessResponse(null, "Visit record created successfully");
};
