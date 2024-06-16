"use client";

import useVisitRecordContext from "../hooks/useVisitRecordContext";

const VisitRecordSection = () => {
  const { visitRecords } = useVisitRecordContext();
  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <h2 className="text-xl font-black">암장 방문 기록</h2>

      <ul className="flex flex-col gap-4">
        {visitRecords.map((visitRecord) => (
          <li key={visitRecord.id}>
            <div className="flex border border-slate-200 rounded-lg p-4">
              <span>{visitRecord.climbCenterId}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisitRecordSection;
