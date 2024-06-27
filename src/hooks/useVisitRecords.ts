import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userId?: string;
};

const useVisitRecords = ({ userId }: Props) => {
  const queryKey = ["visitRecords", userId];
  const query = useQuery({
    enabled: !!userId,
    staleTime: 0,
    queryKey,
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("climb_center_visit")
        .select(
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
        )
        .eq("user_id", userId);

      console.log("visitRecords", data);

      if (error) {
        console.error("supabase Error", error);
        return [];
      }

      return data;
    },
    initialData: [],
  });

  return {
    ...query,
    data: query.data || [],
  };
};

export default useVisitRecords;
