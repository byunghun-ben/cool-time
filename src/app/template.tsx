"use client";

import { setDefaultOptions } from "date-fns";
import { ko } from "date-fns/locale";
import { ReactNode } from "react";

setDefaultOptions({ locale: ko });

const Template = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Template;
