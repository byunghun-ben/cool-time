"use client";

import { ClimbCenter, VisitRecord } from "@/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Props = {
  climbCenters: ClimbCenter[];
};

const VisitedCentersSection = ({ climbCenters }: Props) => {
  const [visitRecords, setVisitRecords] = useState<VisitRecord[]>([]);

  const visitedClimbCenters = useMemo<ClimbCenter[]>(() => {
    const uniqueClimbCenterIds = new Set(
      visitRecords.map((record) => record.climbCenterId)
    );

    return climbCenters.filter((climbCenter) =>
      uniqueClimbCenterIds.has(climbCenter.id)
    );
  }, [visitRecords, climbCenters]);

  useEffect(() => {
    const visitRecordsFromStorage =
      localStorage.getItem("visitRecords") || "[]";
    const parsedVisitRecords = JSON.parse(visitRecordsFromStorage);

    setVisitRecords(parsedVisitRecords);
  }, []);

  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <h2 className="text-lg font-semibold">내가 방문한 암장 목록</h2>

      <ul className="flex flex-col gap-4">
        {visitedClimbCenters.map((climbCenter) => (
          <li key={climbCenter.id}>
            <Link
              href={`/climb/${climbCenter.id}`}
              className="flex border border-slate-200 rounded-lg p-4"
            >
              <span>{climbCenter.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisitedCentersSection;
