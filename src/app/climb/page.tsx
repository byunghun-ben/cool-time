import { getClimbCenters, getUser } from "./apis/server";
import ClimbCenterSection from "./components/ClimbCenterSection";
import VisitRecordSection from "./components/VisitRecordSection";

const ClimbPage = async () => {
  // const user = await getUser();
  // const climbCenters = await getClimbCenters();
  // 위 두 작업을 병렬로 처리하도록 하기 위해 Promise.all을 사용
  const [user, climbCenters] = await Promise.all([
    getUser(),
    getClimbCenters(),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100">
      <VisitRecordSection userId={user?.id} />
      <ClimbCenterSection climbCenters={climbCenters} />
    </div>
  );
};

export default ClimbPage;
