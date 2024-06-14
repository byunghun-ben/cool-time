import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import { successResponseSchema } from "@/lib/apiResponse";
import SectorSection from "./components/SectorSection";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const getClimbCenter = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/climb-center/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch climb center");
  }

  try {
    const body = await response.json();
    const parsedBody = successResponseSchema.parse(body);
    const data = climbingCenterSchema.parse(parsedBody.data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type Props = {
  params: {
    id: string;
  };
};

const ClimbCenterDetailAdminPage = async ({ params }: Props) => {
  const climbCenterId = Number(params.id);
  const climbCenter = await getClimbCenter(climbCenterId);

  if (!climbCenter) {
    return (
      <div>
        <h1>클라이밍 센터를 찾을 수 없어요.</h1>
      </div>
    );
  }

  const climbCenterSectors = climbCenter.climb_center_sector.map((sector) => {
    return {
      id: sector.id,
      name: sector.name,
      settingHistory: sector.climb_center_sector_setting.map((setting) => {
        return {
          id: setting.id,
          settingDate: new Date(setting.setting_date),
        };
      }),
    };
  });

  return (
    <div>
      <section className="flex flex-col gap-2 p-6">
        <h1 className="text-2xl font-bold text-slate-700">클라이밍장 관리</h1>
      </section>

      <section className="flex flex-col gap-2 p-6">
        <h3 className="text-xl font-black text-slate-700">
          {climbCenter.name}
        </h3>
      </section>

      <SectorSection climbCenter={climbCenter} />
    </div>
  );
};

export default ClimbCenterDetailAdminPage;
