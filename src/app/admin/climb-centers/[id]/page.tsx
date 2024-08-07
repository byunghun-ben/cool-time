import { getClimbCenter } from "@/app/climb/apis/server";
import { notFound } from "next/navigation";
import SectorSection from "./_components/SectorSection";

type Props = {
  params: {
    id: string;
  };
};

const ClimbCenterDetailAdminPage = async ({ params }: Props) => {
  const climbCenterId = Number(params.id);
  const climbCenter = await getClimbCenter(climbCenterId);

  if (!climbCenter) {
    return notFound();
  }

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
