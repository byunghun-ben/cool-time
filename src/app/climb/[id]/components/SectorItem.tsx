"use client";

import { ClimbCenterSector } from "@/types";
import { format, isFuture, isPast } from "date-fns";
import { useMemo } from "react";

// 1.	이미 방문했던 벽: Visited
// 2.	아직 타지 못한 벽: Not Climbed
// 3.	세팅중인 벽: Setting in Progress
// 4.	아직 타지 못한 벽 (방문 기록 없음): Not Climbed
// 5.	섹터 설정되지 않음: Not Set
const SECTOR_STATUS = {
  VISITED: "visited",
  NOT_CLIMBED: "notClimbed",
  SETTING_IN_PROGRESS: "settingInProgress",
  NOT_SET: "notSet",
} as const;

// status에 따른 배경색
const SECTOR_STATUS_COLOR = {
  visited: "bg-red-100",
  notClimbed: "bg-blue-100",
  settingInProgress: "bg-green-100",
  notSet: "bg-slate-100",
} as const;

type SectorStatus = (typeof SECTOR_STATUS)[keyof typeof SECTOR_STATUS];

const getSectorStatus = (
  sectorSettingDate: string | undefined,
  lastVisitDate: string | undefined
): SectorStatus => {
  const today = format(new Date(), "yyyy-MM-dd");

  if (today === sectorSettingDate) {
    return SECTOR_STATUS.SETTING_IN_PROGRESS;
  }

  if (!lastVisitDate) {
    return SECTOR_STATUS.NOT_CLIMBED;
  }

  if (!sectorSettingDate) {
    return SECTOR_STATUS.NOT_SET;
  }

  if (
    new Date(lastVisitDate).getTime() >= new Date(sectorSettingDate).getTime()
  ) {
    return SECTOR_STATUS.VISITED;
  }

  return SECTOR_STATUS.NOT_CLIMBED;
};

type SectorItemProps = {
  sector: ClimbCenterSector;
  lastVisitDate: string | undefined;
};

const SectorItem = ({ sector, lastVisitDate }: SectorItemProps) => {
  const settingDates = sector.settingHistory
    .map((setting) => setting.settingDate)
    .sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });

  // 오늘을 기준으로 가장 최근 세팅 날짜
  const recentSettingDate = useMemo(() => {
    return settingDates.filter((settingDate) => {
      return isPast(settingDate);
    })[0];
  }, [settingDates]);

  // 오늘을 기준으로 가장 가까운 세팅 날짜
  const nextSettingDate = useMemo(() => {
    return settingDates.filter((settingDate) => {
      return isFuture(settingDate);
    })[0];
  }, [settingDates]);

  const status = getSectorStatus(recentSettingDate, lastVisitDate);

  console.log(recentSettingDate, nextSettingDate, status);
  return (
    <li className="">
      <div
        className={`flex flex-col gap-2 p-3 rounded-lg ${SECTOR_STATUS_COLOR[status]}`}
      >
        <span className="font-semibold">{sector.name}</span>

        {status === SECTOR_STATUS.VISITED && (
          <span className="text-xs text-slate-500">이미 방문했던 벽</span>
        )}

        {status === SECTOR_STATUS.NOT_CLIMBED && (
          <span className="text-xs text-slate-500">아직 타지 못한 벽</span>
        )}

        {status === SECTOR_STATUS.SETTING_IN_PROGRESS && (
          <span className="text-xs text-slate-500">세팅중인 벽</span>
        )}

        {status === SECTOR_STATUS.NOT_SET && (
          <span className="text-xs text-slate-500">
            최근 세팅 날짜를 확인할 수 없어요.
          </span>
        )}

        <div className="flex flex-col">
          <span className="text-xs text-slate-500">최근 세팅 날짜</span>
          {recentSettingDate && (
            <span className="text-sm text-slate-700">{recentSettingDate}</span>
          )}
          {!recentSettingDate && (
            <span className="text-sm text-slate-700">확인할 수 없어요 :(</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-slate-500">다음 세팅 날짜</span>
          {nextSettingDate && (
            <span className="text-sm text-slate-700">{nextSettingDate}</span>
          )}
          {!nextSettingDate && (
            <span className="text-sm text-slate-700">확인할 수 없어요 :(</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default SectorItem;
