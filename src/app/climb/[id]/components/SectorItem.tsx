"use client";

import { climbCenterSectorSchema } from "@/app/api/climb-center/schema";
import { useMemo } from "react";
import { z } from "zod";

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
  sectorSettingDate: Date | undefined,
  lastVisitDate: Date | undefined
): SectorStatus => {
  const today = new Date();

  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const sectorSettingDateWithoutTime = sectorSettingDate
    ? new Date(
        sectorSettingDate.getFullYear(),
        sectorSettingDate.getMonth(),
        sectorSettingDate.getDate()
      )
    : null;
  const lastVisitDateWithoutTime = lastVisitDate
    ? new Date(
        lastVisitDate.getFullYear(),
        lastVisitDate.getMonth(),
        lastVisitDate.getDate()
      )
    : null;

  if (!sectorSettingDateWithoutTime) {
    return SECTOR_STATUS.NOT_SET;
  }

  if (todayWithoutTime.getTime() === sectorSettingDateWithoutTime.getTime()) {
    return SECTOR_STATUS.SETTING_IN_PROGRESS;
  }

  if (!lastVisitDateWithoutTime) {
    return SECTOR_STATUS.NOT_CLIMBED;
  }

  if (
    lastVisitDateWithoutTime.getTime() >= sectorSettingDateWithoutTime.getTime()
  ) {
    return SECTOR_STATUS.VISITED;
  }

  return SECTOR_STATUS.NOT_CLIMBED;
};

type SectorItemProps = {
  sector: z.infer<typeof climbCenterSectorSchema>;
  lastVisitDate: Date | undefined;
};

const SectorItem = ({ sector, lastVisitDate }: SectorItemProps) => {
  const settingDates = sector.climb_center_sector_setting
    .map((setting) => new Date(setting.setting_date))
    .sort();

  // 오늘을 기준으로 가장 최근 세팅 날짜
  const recentSettingDate = useMemo(() => {
    const todayDate = new Date();
    const todayWithoutTime = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );

    return settingDates.filter((settingDate) => {
      return settingDate <= todayWithoutTime;
    })[0];
  }, [settingDates]);

  // 오늘을 기준으로 가장 가까운 세팅 날짜
  const nextSettingDate = useMemo(() => {
    const todayDate = new Date();
    return settingDates.find((settingDate) => settingDate > todayDate);
  }, [settingDates]);

  const status = getSectorStatus(recentSettingDate, lastVisitDate);

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

        {/* <div className="flex flex-col">
          <span className="text-xs text-slate-500">쿨타임</span>
          <span className="text-sm text-slate-700">{cooltime}일</span>
        </div> */}

        <div className="flex flex-col">
          <span className="text-xs text-slate-500">최근 세팅 날짜</span>
          {recentSettingDate && (
            <span className="text-sm text-slate-700">
              {recentSettingDate.toLocaleDateString()}
            </span>
          )}
          {!recentSettingDate && (
            <span className="text-sm text-slate-700">확인할 수 없어요 :(</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-slate-500">다음 세팅 날짜</span>
          {nextSettingDate && (
            <span className="text-sm text-slate-700">
              {nextSettingDate.toLocaleDateString()}
            </span>
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
