import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";

export const POST = async (request: Request) => {
  const requestBody = await request.json();

  const supabase = createClient();

  const { data, error, status } = await supabase
    .from("climb_center_sector")
    .insert([
      {
        climb_center_id: requestBody.climbCenterId,
        name: requestBody.name,
      },
    ])
    .select();

  if (error) {
    return createErrorResponse("internal_server_error", error.message, status);
  }

  return createSuccessResponse(data, "암장 섹터를 성공적으로 추가했습니다.");
};
