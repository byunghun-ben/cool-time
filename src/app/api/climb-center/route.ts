import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { climbingCenterSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const GET = async (request: Request) => {
  const responseSchema = z.array(climbingCenterSchema);

  const supabase = createClient();

  const res = await supabase.from("climb_center").select(`
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
