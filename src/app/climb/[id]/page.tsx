import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { getClimbCenter, getVisitRecords } from "../apis/server";
import CooltimeSection from "./components/CooltimeSection";
import VisitRecordSection from "./components/VisitRecordSection";
import Link from "next/link";

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
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100 px-3 pt-4 pb-10">
      <section className="flex flex-col gap-2 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-black">{climbCenter.name}</h1>
        <p className="text-sm text-slate-700">{climbCenter.address}</p>
        <Link
          href={climbCenter.instagramUrl}
          target="_blank"
          rel="noopener"
          className="text-sm text-slate-500"
        >
          인스타그램
        </Link>
      </section>

      <CooltimeSection
        sectors={climbCenter.sectors}
        visitRecords={visitRecords}
      />

      <VisitRecordSection
        climbCenter={climbCenter}
        userId={user?.id}
        visitRecords={visitRecords}
      />
    </div>
  );
};

export default ClimbCenterDetailPage;
