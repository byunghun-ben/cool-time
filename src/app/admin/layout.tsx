import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const navigationGuard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.role === "admin";

  if (!user || !isAdmin) {
    redirect("/");
  }
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await navigationGuard();

  return <>{children}</>;
};

export default AdminLayout;
