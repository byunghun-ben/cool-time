import { getClimbCenters } from "../apis/server/getClimbCenters";
import VisitedCentersSection from "./components/VisitedCentersSection";

const VisitedClimbCentersPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <VisitedCentersSection climbCenters={climbCenters} />
    </div>
  );
};

export default VisitedClimbCentersPage;
