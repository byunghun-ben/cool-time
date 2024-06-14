"use client";

import { climbCenterSectorSchema } from "@/app/api/climb-center/schema";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";
import SectorItem from "./SectorItem";
import useVisitRecordContext from "@/hooks/useVisitRecordContext";

const climbCenterSectorsSchema = z.array(climbCenterSectorSchema);

type Props = {
  sectors: z.infer<typeof climbCenterSectorsSchema>;
};

const CooltimeSection = ({ sectors }: Props) => {
  const params = useParams<{ id: string }>();
  const climbCenterId = Number(params.id);
  // 최근 방문일
  const { visitRecords } = useVisitRecordContext();
  const lastVisitDate = useMemo<Date | undefined>(() => {
    return visitRecords
      .filter((visitRecord) => visitRecord.climbCenterId === climbCenterId)
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime())
      .map((visitRecord) => visitRecord.visitDate)[0];
  }, [visitRecords, climbCenterId]);

  return (
    <section className="flex flex-col gap-6 px-6 py-3">
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
