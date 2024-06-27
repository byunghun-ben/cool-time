import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { getClimbCenter, getVisitRecords } from "../apis/server";
import CooltimeSection from "./components/CooltimeSection";
import VisitRecordSection from "./components/VisitRecordSection";

type Props = {
  params: {
    id: string;
  };
};

const ClimbCenterDetailPage = async ({ params: { id } }: Props) => {
  const climbCenterId = Number(id);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const climbCenter = await getClimbCenter(climbCenterId);
  const visitRecords = await getVisitRecords({ userId: user?.id });

  if (!climbCenter) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <section className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-black">{climbCenter.name}</h1>
      </section>

      <VisitRecordSection
        climbCenter={climbCenter}
        userId={user?.id}
        visitRecords={visitRecords}
      />

      <CooltimeSection
        sectors={climbCenter.sectors}
        visitRecords={visitRecords}
      />
    </div>
  );
};

export default ClimbCenterDetailPage;
