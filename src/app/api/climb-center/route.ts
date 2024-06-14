import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { climbingCenterSchema } from "./schema";

export const GET = async (request: Request) => {
  const responseSchema = z.array(climbingCenterSchema);

  const supabase = createClient();

  const res = await supabase.from("climb_center").select(`
      *,
      climb_center_sector (
        *,
        climb_center_sector_setting (*)
      )
    `);

  const isSuccess = res.error === null;

  if (!isSuccess) {
    return createErrorResponse(
      "internal_server_error",
      res.error.message,
      res.status
    );
  }

  try {
    const data = responseSchema.parse(res.data);
    return createSuccessResponse(data, "암장 목록을 성공적으로 불러왔습니다.");
  } catch (error) {
    return createErrorResponse(
      "invalid_response_data",
      "응답 데이터가 유효하지 않습니다.",
      500
    );
  }
};
