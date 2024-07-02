import { getClimbCenters, getUser } from "./apis/server";
import ClimbCenterSection from "./components/ClimbCenterSection";
import VisitRecordSection from "./components/VisitRecordSection";

const ClimbPage = async () => {
  const user = await getUser();
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100">
      {user && <VisitRecordSection userId={user.id} />}
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
