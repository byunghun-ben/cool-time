import { getClimbCenters } from "./apis/server";
import ClimbCenterSection from "./components/ClimbCenterSection";

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();
  // const visitRecords = await getVisitRecords();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* <VisitRecordSection
        climbCenters={climbCenters}
        visitRecords={visitRecords}
      /> */}
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
