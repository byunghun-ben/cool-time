import { ReactNode } from "react";
import Nav from "../_components/Nav";
import { getUser } from "./apis/server";

const ClimbLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Nav userId={user?.id} />
      {children}
    </div>
  );
};

export default ClimbLayout;
