"use client";

import { ClimbCenterSector, VisitRecord } from "@/types";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import SectorItem from "./SectorItem";

type Props = {
  sectors: ClimbCenterSector[];
  visitRecords: VisitRecord[];
};

const CooltimeSection = ({ sectors, visitRecords }: Props) => {
  const params = useParams<{ id: string }>();
  const climbCenterId = Number(params.id);
  // 최근 방문일

  const lastVisitDate = useMemo<string | undefined>(() => {
    const visitRecord = visitRecords
      .filter((visitRecord) => visitRecord.climbCenterId === climbCenterId)
      .sort((a, b) => {
        return (
          new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
        );
      })[0];

    return visitRecord?.visitDate;
  }, [visitRecords, climbCenterId]);

  const isEmpty = sectors.length === 0;

  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-lg">
      <h2 className="text-lg font-semibold">쿨타임</h2>

      {isEmpty && (
        <p className="text-slate-500 text-sm">
          아직 이 암장에 대한 정보가 입력되지 않았어요. 금방 업데이트 할게요!
        </p>
      )}

      {!isEmpty && (
        <div className="">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 aspect-square rounded bg-blue-100" />
              <span className="text-sm text-slate-500">
                내 손길이 닿지 않은
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 aspect-square rounded bg-red-100" />
              <span className="text-sm text-slate-500">내가 타본</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 aspect-square rounded bg-green-100" />
              <span className="text-sm text-slate-500">세팅 중인</span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {sectors.map((sector) => (
              <SectorItem
                key={sector.id}
                sector={sector}
                lastVisitDate={lastVisitDate}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CooltimeSection;
