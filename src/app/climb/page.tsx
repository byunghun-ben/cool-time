import { getUser } from "./apis/server";
import getClimbCenters from "./apis/server/getClimbCenters";
import ClimbCenterSection from "./components/ClimbCenterSection";

const ClimbPage = async () => {
  console.time("ClimbPage");
  const [climbCenters] = await Promise.all([getClimbCenters()]);
  console.timeEnd("ClimbPage");

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100">
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
