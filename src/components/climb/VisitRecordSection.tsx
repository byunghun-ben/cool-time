"use client";

import { Button } from "@/components/ui/button";
import useVisitRecordContext from "@/hooks/useVisitRecordContext";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import CreateVisitRecordForm from "./CreateVisitRecordForm";

const VisitRecordSection = () => {
  const params = useParams<{ id: string }>();
  const climbCenterId = Number(params.id);
  const { visitRecords, removeVisitRecord } = useVisitRecordContext();

  const thisCenterVisitRecords = useMemo(() => {
    return visitRecords
      .filter((visitRecord) => visitRecord.climbCenterId === climbCenterId)
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  }, [visitRecords, climbCenterId]);

  const handleRemoveVisitRecord = useCallback(
    (recordId: string) => () => {
      removeVisitRecord(recordId);
    },
    [removeVisitRecord]
  );

  return (
    <section className="flex flex-col gap-4 px-6 py-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">내 방문 기록</h2>
        <p className="text-sm text-slate-500">
          내 방문 기록을 입력하면, 어떤 벽이 새로 세팅되었는지 확인할 수 있어요
          <br />
          방문 기록은 내 기기에 저장되며, 다른 사람에게 공유되지 않아요.
        </p>
      </div>

      <CreateVisitRecordForm />

      <ul className="grid grid-cols-1 gap-2">
        {thisCenterVisitRecords.map((visitRecord) => (
          <li
            key={visitRecord.id}
            className="flex items-center justify-between bg-white rounded-lg p-3"
          >
            <span>{visitRecord.visitDate.toLocaleDateString()}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveVisitRecord(visitRecord.id)}
            >
              <span>삭제</span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisitRecordSection;
