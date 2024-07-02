import { format } from "date-fns";
import { getVisitRecords } from "../apis/server";
import { VisitRecord } from "@/types";
import Link from "next/link";

type Props = {
  userId: string;
};

const VisitRecordSection = async ({ userId }: Props) => {
  const visitRecords = await getVisitRecords({ userId });
  const isEmpty = visitRecords.length === 0;

  visitRecords.sort((a, b) => {
    const aDate = new Date(a.visitDate);
    const bDate = new Date(b.visitDate);
    return bDate.getTime() - aDate.getTime();
  });

  const recentVisitRecordByClimbCenter = visitRecords.reduce((acc, record) => {
    if (!acc[record.climbCenter.name]) {
      acc[record.climbCenter.name] = record;
    }

    return acc;
  }, {} as Record<string, VisitRecord>);

  return (
    <section className="flex flex-col gap-6 px-6 py-6 bg-white">
      <h1 className="text-2xl font-bold">내 클라이밍 기록</h1>
      {isEmpty && (
        <div className="flex flex-col gap-2">
          <span>아직은 클라이밍 센터에 다녀온 기록이 없어요</span>
        </div>
      )}
      {!isEmpty && (
        <ul className="flex flex-col gap-4">
          {Object.entries(recentVisitRecordByClimbCenter).map(
            ([climbCenterName, record]) => (
              <li key={climbCenterName}>
                <Link
                  className="flex flex-col gap-1"
                  href={`/climb/${record.climbCenterId}`}
                >
                  <h2 className="font-bold">{climbCenterName}</h2>
                  <span className="text-sm text-slate-500">{`${format(
                    record.visitDate,
                    "yyyy년 MM월 dd일"
                  )}`}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};

export default VisitRecordSection;
