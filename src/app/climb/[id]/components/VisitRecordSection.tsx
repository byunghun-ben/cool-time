"use client";

import { ClimbCenter, VisitRecord } from "@/types";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { deleteVisitRecord } from "../../apis/client";
import CreateVisitRecordForm from "./CreateVisitRecordForm";
import Link from "next/link";

type Props = {
  climbCenter: ClimbCenter;
  visitRecords: VisitRecord[];
  userId?: string;
};

const VisitRecordSection = ({ climbCenter, visitRecords, userId }: Props) => {
  const params = useParams<{ id: string }>();
  const climbCenterId = Number(params.id);

  const { refresh } = useRouter();

  const isLoggedIn = !!userId;

  const thisCenterVisitRecords = useMemo(() => {
    return visitRecords
      .filter((visitRecord) => visitRecord.climbCenterId === climbCenterId)
      .sort((a, b) => {
        return (
          new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
        );
      });
  }, [visitRecords, climbCenterId]);

  const handleRemoveVisitRecord = useCallback(
    (recordId: number) => async () => {
      try {
        await deleteVisitRecord(recordId);
        refresh();
      } catch (error) {
        return;
      }
    },
    [refresh]
  );

  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-lg">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">내 방문 기록</h2>
        <p className="text-sm text-slate-500">
          내 방문 기록을 입력하면, 어떤 벽이 새로 세팅되었는지 확인할 수 있어요
        </p>
      </div>

      {!isLoggedIn && (
        <p className="text-sm text-slate-700">
          방문 기록을 남기려면{" "}
          <Link href="/auth/login" className="underline font-bold">
            로그인
          </Link>
          이 필요해요
        </p>
      )}

      {isLoggedIn && (
        <>
          <CreateVisitRecordForm climbCenter={climbCenter} userId={userId} />
          <ul className="grid grid-cols-1 gap-2">
            {thisCenterVisitRecords.map((visitRecord) => (
              <li
                key={visitRecord.id}
                className="flex items-center justify-between bg-white rounded-lg"
              >
                <span className="text-sm text-slate-500">
                  {visitRecord.visitDate}
                </span>
                <button
                  onClick={handleRemoveVisitRecord(visitRecord.id)}
                  className="text-sm text-slate-500 hover:text-red-500"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default VisitRecordSection;
