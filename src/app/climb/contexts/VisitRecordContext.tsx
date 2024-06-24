"use client";

import { VisitRecord } from "@/types";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type VisitRecordContextType = {
  visitRecords: VisitRecord[];
  setVisitRecords: (visitRecords: VisitRecord[]) => void;
  createVisitRecord: (visitRecord: VisitRecord) => void;
  removeVisitRecord: (visitRecordId: number) => void;
};

export const VisitRecordContext = createContext<VisitRecordContextType>({
  visitRecords: [],
  setVisitRecords: () => {},
  createVisitRecord: () => {},
  removeVisitRecord: () => {},
});

export const VisitRecordProvider = ({ children }: { children: ReactNode }) => {
  const [visitRecords, setVisitRecords] = useState<VisitRecord[]>([]);

  const createVisitRecord = useCallback(
    (visitRecord: VisitRecord) => {
      const newVisitRecords = [...visitRecords, visitRecord];
      setVisitRecords(newVisitRecords);
      localStorage.setItem("visitRecords", JSON.stringify(newVisitRecords));
    },
    [visitRecords]
  );

  const removeVisitRecord = useCallback(
    (visitRecordId: number) => {
      const newVisitRecords = visitRecords.filter(
        (visitRecord) => visitRecord.id !== visitRecordId
      );

      setVisitRecords(newVisitRecords);
      localStorage.setItem("visitRecords", JSON.stringify(newVisitRecords));
    },
    [visitRecords]
  );

  useEffect(() => {
    // 로컬 스토리지에서 방문 기록을 가져와서 visitRecords에 저장
    const visitRecordsFromLocalStorage =
      localStorage.getItem("visitRecords") || "[]";
    const parsedVisitRecords = JSON.parse(visitRecordsFromLocalStorage);
    const visitRecords = parsedVisitRecords.map((visitRecord: VisitRecord) => ({
      ...visitRecord,
      visitDate: new Date(visitRecord.visitDate),
    }));
    console.log(visitRecords);
    setVisitRecords(parsedVisitRecords);
  }, []);

  return (
    <VisitRecordContext.Provider
      value={{
        visitRecords,
        setVisitRecords,
        createVisitRecord,
        removeVisitRecord,
      }}
    >
      {children}
    </VisitRecordContext.Provider>
  );
};
