"use client";

import { ClimbCenter } from "@/types";
import { filterClimbCentersInSetting, groupByBrand } from "@/utils/climb";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { addDays, format, isSameDay, subDays } from "date-fns";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  climbCenters: ClimbCenter[];
};

const ClimbCentersInSettingSection = ({ climbCenters }: Props) => {
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const isToday = isSameDay(new Date(), currentDate);

  const changeDate = (date: string | Date) => {
    setCurrentDate(format(date, "yyyy-MM-dd"));
  };

  const handleChangePrevDate = () => {
    const prevDate = subDays(currentDate, 1);

    changeDate(prevDate);
  };

  const handleChangeNextDate = () => {
    const nextDate = addDays(currentDate, 1);

    changeDate(nextDate);
  };

  const climbCenterGroupInSetting = useMemo(() => {
    return groupByBrand(filterClimbCentersInSetting(climbCenters, currentDate));
  }, [climbCenters, currentDate]);

  const dateLabel = useMemo(() => {
    return `${format(currentDate, "M월 d일 (eee)")} ${isToday ? "(오늘)" : ""}`;
  }, [currentDate, isToday]);

  return (
    <section className="flex flex-col gap-4 p-6">
      <header className="flex items-center">
        <h1 className="flex-1 text-lg font-bold">세팅중인 암장</h1>

        {!isToday && (
          <button
            className="flex-none self-stretch flex items-center justify-center px-2 text-sm font-bold text-slate-700 border border-slate-400 rounded-md"
            onClick={() => {
              changeDate(new Date());
            }}
          >
            오늘
          </button>
        )}
      </header>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={handleChangePrevDate} className="text-slate-500">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <span className={`flex font-medium`}>{dateLabel}</span>
          <button onClick={handleChangeNextDate} className="text-slate-500">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {Object.entries(climbCenterGroupInSetting).map(
            ([brandName, climbCenters]) => (
              <div key={brandName} className="flex flex-col gap-2">
                <h2 className="font-bold bg-slate-100 border border-slate-200 p-3 rounded-lg">
                  {brandName}
                </h2>

                {climbCenters.map((climbCenter) => (
                  <Link
                    key={climbCenter.id}
                    href={`/climb/${climbCenter.id}`}
                    className="w-full flex items-center p-3"
                  >
                    <span className="font-medium">{climbCenter.name}</span>
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ClimbCentersInSettingSection;
