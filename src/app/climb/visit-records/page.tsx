import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import { successResponseSchema } from "@/lib/apiResponse";
import VisitedCentersSection from "./components/VisitedCentersSection";

const getClimbCenters = async () => {
  const res = await fetch("http://localhost:3000/api/climb-center");

  if (!res.ok) {
    throw new Error("Failed to fetch climb centers");
  }

  try {
    const body = await res.json();
    const parsedBody = successResponseSchema.parse(body);
    const data = climbingCenterSchema.array().parse(parsedBody.data);

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const VisitedClimbCentersPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <VisitedCentersSection climbCenters={climbCenters} />
    </div>
  );
};

export default VisitedClimbCentersPage;
