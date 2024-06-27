import { createErrorResponse, createSuccessResponse } from "@/lib/apiResponse";
import { createClient } from "@/utils/supabase/server";

type DeleteParams = {
  params: {
    id: string;
  };
};

export const DELETE = async (req: Request, { params }: DeleteParams) => {
  const id = Number(params.id);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return createErrorResponse("User not found");
  }

  const { error } = await supabase
    .from("climb_center_visit")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return createErrorResponse(error.message);
  }

  return createSuccessResponse(null, "Visit record deleted successfully");
};
