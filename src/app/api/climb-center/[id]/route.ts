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
        name
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
    // sectors의 settingHistory를 settingDate 기준으로 정렬한다.
    data.sectors.forEach((sector) => {
      sector.settingHistory.sort((a, b) => {
        return (
          new Date(b.settingDate).getTime() - new Date(a.settingDate).getTime()
        );
      });
    });

    return createSuccessResponse(data, "암장 정보를 성공적으로 불러왔습니다.");
  } catch (error) {
    return createErrorResponse(
      "invalid_response_data",
      "응답 데이터가 유효하지 않습니다.",
      500
    );
  }
};
