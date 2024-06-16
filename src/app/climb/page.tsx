import { getClimbCenters } from "./apis";
import VisitRecordSection from "./components/VisitRecordSection";

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <VisitRecordSection />
    </div>
  );
};

export default ClimbPage;
