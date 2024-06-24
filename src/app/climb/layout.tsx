import Link from "next/link";
import { ReactNode } from "react";
import { VisitRecordProvider } from "./contexts/VisitRecordContext";

const ClimbLayout = ({ children }: { children: ReactNode }) => {
  return (
    <VisitRecordProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <header className="sticky top-0 h-12 bg-white border-b px-4 flex items-center justify-between">
          <Link href="/climb" className="font-black text-slate-700">
            클(라이밍 쿨)타임
          </Link>

          <div className="flex items-center">
            <Link href="/climb" className="text-sm font-bold text-slate-700">
              전체 암장 보기
            </Link>
            {/* 내가 방문한 암장 보기 */}
            {/* <Link
              href="/climb/visit-records"
              className="text-sm font-bold text-slate-700 ml-4"
            >
              내 암장 보기
            </Link> */}
          </div>
        </header>
        {children}
      </div>
    </VisitRecordProvider>
  );
};

export default ClimbLayout;
