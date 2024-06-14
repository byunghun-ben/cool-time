import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import CooltimeSection from "@/components/climb/CooltimeSection";
import VisitRecordSection from "@/components/climb/VisitRecordSection";
import { VisitRecordProvider } from "@/contexts/VisitRecordContext";
import { createClient } from "@/utils/supabase/server";

const getClimbCenter = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("climb_center")
    .select(
      `
      *,
      climb_center_sector (
        *,
        climb_center_sector_setting (*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return climbingCenterSchema.parse(data);
};

type Props = {
  params: {
    id: string;
  };
};

const ClimbCenterDetailPage = async ({ params: { id } }: Props) => {
  const climbCenter = await getClimbCenter(id);

  return (
    <VisitRecordProvider>
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <section className="flex flex-col gap-6 p-6">
          <h1 className="text-2xl font-black">{climbCenter.name}</h1>
        </section>

        <VisitRecordSection />

        <CooltimeSection sectors={climbCenter.climb_center_sector} />
      </div>
    </VisitRecordProvider>
  );
};

export default ClimbCenterDetailPage;
