"use client";

import { Button } from "@/components/ui/button";
import { ClimbCenter } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { deleteClimbSectorSetting } from "../_actions";
import AddSectorForm from "./AddSectorForm";
import AddSectorSettingDialog from "./AddSectorSettingDialog";

type Props = {
  climbCenter: ClimbCenter;
};

const SectorSection = ({ climbCenter }: Props) => {
  const router = useRouter();

  const handleClickDelete = useCallback(
    (sectorSettingId: number) => async () => {
      try {
        await deleteClimbSectorSetting(sectorSettingId);
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [router]
  );

  return (
    <section className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-black text-slate-700">섹터</h3>

      <ul className="grid grid-cols-2 gap-4">
        {climbCenter.sectors.map((sector) => (
          <li
            key={sector.id}
            className="flex flex-col gap-2 border border-slate-200 p-3"
          >
            <span className="font-bold text-slate-700">{sector.name}</span>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-slate-500">세팅 기록</h4>
              <ul className="flex flex-col">
                {sector.settingHistory.map((setting) => (
                  <li key={setting.id} className="flex items-center">
                    <span className="flex-1 text-sm">
                      {setting.settingDate}
                    </span>
                    <Button
                      onClick={handleClickDelete(setting.id)}
                      size="sm"
                      variant="ghost"
                      className="flex-none text-xs"
                    >
                      삭제
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <AddSectorSettingDialog sector={sector} />
          </li>
        ))}
      </ul>

      <AddSectorForm climbCenterId={climbCenter.id} />
    </section>
  );
};

export default SectorSection;
