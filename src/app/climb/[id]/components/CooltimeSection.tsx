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

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <h2 className="text-lg font-semibold">쿨타임</h2>

      <ul className="grid grid-cols-2 gap-2">
        {sectors.map((sector) => (
          <SectorItem
            key={sector.id}
            sector={sector}
            lastVisitDate={lastVisitDate}
          />
        ))}
      </ul>
    </section>
  );
};

export default CooltimeSection;
