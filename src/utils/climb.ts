import { ClimbCenter } from "@/types";
import { isSameDay } from "date-fns";

// climbcenters를 climbBrand 기준으로 그룹핑
export const groupByBrand = (climbCenters: ClimbCenter[]) => {
  return climbCenters.reduce((acc, climbCenter) => {
    if (!acc[climbCenter.brand.name]) {
      acc[climbCenter.brand.name] = [];
    }

    acc[climbCenter.brand.name].push(climbCenter);

    return acc;
  }, {} as Record<string, ClimbCenter[]>);
};

// (climbCenters, date) => climbCenters
// climbCenters에서 date에 해당하는 섹터의 세팅이 있는 climbCenter만 필터링
export const filterClimbCentersInSetting = (
  climbCenters: ClimbCenter[],
  date: Date | string
) => {
  return climbCenters.filter((climbCenter) => {
    return climbCenter.sectors.some((sector) => {
      return sector.settingHistory.some((setting) =>
        isSameDay(setting.settingDate, date)
      );
    });
  });
};
