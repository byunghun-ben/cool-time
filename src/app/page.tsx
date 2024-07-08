import ClimbCentersInSettingSection from "@/components/ClimbCentersInSettingSection";
import getClimbCenters from "./climb/apis/server/getClimbCenters";
import VisitRecordSection from "./_components/VisitRecordSection";

export default async function Home() {
  const climbCenters = await getClimbCenters();

  return (
    <>
      <ClimbCentersInSettingSection climbCenters={climbCenters} />
      <VisitRecordSection />
    </>
  );
}
