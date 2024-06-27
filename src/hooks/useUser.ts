import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      return user;
    },
  });

  return query;
};

export default useUser;
