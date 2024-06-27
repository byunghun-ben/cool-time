import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import Nav from "../_components/Nav";

const ClimbLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user?.id);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Nav userId={user?.id} />
      {children}
    </div>
    // <VisitRecordProvider>
    // {/* </VisitRecordProvider> */}
  );
};

export default ClimbLayout;
