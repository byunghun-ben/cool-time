import { useContext } from "react";
import { VisitRecordContext } from "@/contexts/VisitRecordContext";

const useVisitRecordContext = () => {
  const visitRecordContext = useContext(VisitRecordContext);
  if (!visitRecordContext) {
    throw new Error(
      "useVisitRecordContext must be used within a VisitRecordProvider"
    );
  }
  return visitRecordContext;
};

export default useVisitRecordContext;
