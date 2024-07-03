import { getClimbCenters, getUser } from "./apis/server";
import ClimbCenterSection from "./components/ClimbCenterSection";
import VisitRecordSection from "./components/VisitRecordSection";

const ClimbPage = async () => {
  console.time("ClimbPage");
  const [user, climbCenters] = await Promise.all([
    getUser(),
    getClimbCenters(),
  ]);
  console.timeEnd("ClimbPage");

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100">
      <VisitRecordSection userId={user?.id} />
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
