import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";
import { climbingCenterSchema } from "../schema";

type Parmas = {
  params: {
    id: string;
  };
};

const getResponseSchema = climbingCenterSchema;

export const GET = async (request: Request, { params }: Parmas) => {
  const climbCenterId = Number(params.id);
  const supabase = createClient();
  const supabaseResponse = await supabase
    .from("climb_center")
    .select(
      `
    *,
    climb_center_sector (
      *,
      climb_center_sector_setting (*)
    )
  `
    )
    .eq("id", climbCenterId)
    .single();

  const isSuccess = supabaseResponse.error === null;

  if (!isSuccess) {
    return createErrorResponse(
      "internal_server_error",
      supabaseResponse.error.message,
      supabaseResponse.status
    );
  }

  try {
    const data = getResponseSchema.parse(supabaseResponse.data);
    return createSuccessResponse(data, "암장 정보를 성공적으로 불러왔습니다.");
  } catch (error) {
    return createErrorResponse(
      "invalid_response_data",
      "응답 데이터가 유효하지 않습니다.",
      500
    );
  }
};
