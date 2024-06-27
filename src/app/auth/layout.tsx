import { ReactNode } from "react";
import Nav from "../_components/Nav";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default AuthLayout;
