import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const climbSectorSettingId = Number(params.id);

  const supabase = createClient();

  const { error } = await supabase
    .from("climb_center_sector_setting")
    .delete()
    .eq("id", climbSectorSettingId);

  if (error) {
    return createErrorResponse("internal_server_error", error.message, 500);
  }

  return createSuccessResponse(
    null,
    "암장 섹터 세팅을 성공적으로 삭제했습니다."
  );
};
