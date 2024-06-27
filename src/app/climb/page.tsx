import { getClimbCenters } from "./apis/server";
import ClimbCenterSection from "./components/ClimbCenterSection";

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
