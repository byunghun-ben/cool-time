import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import VisitedCentersSection from "@/components/climb/VisitedCentersSection";
import { successResponseSchema } from "@/lib/apiResponse";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const getClimbCenters = async () => {
  const res = await fetch(`${BASE_URL}/api/climb-center`);

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
