import { notFound } from "next/navigation";
import { getClimbCenter } from "../apis";
import CooltimeSection from "./components/CooltimeSection";
import VisitRecordSection from "./components/VisitRecordSection";

type Props = {
  params: {
    id: string;
  };
};

const ClimbCenterDetailPage = async ({ params: { id } }: Props) => {
  const climbCenterId = Number(id);
  const climbCenter = await getClimbCenter(climbCenterId);

  if (!climbCenter) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <section className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-black">{climbCenter.name}</h1>
      </section>

      <VisitRecordSection climbCenter={climbCenter} />

      <CooltimeSection sectors={climbCenter.sectors} />
    </div>
  );
};

export default ClimbCenterDetailPage;
