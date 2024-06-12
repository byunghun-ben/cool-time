import { successResponseSchema } from "@/lib/apiResponse";
import SignupForm from "./components/SignupForm";
import { climbingCenterSchema } from "../api/climb_center/schema";

const getClimbCenters = async () => {
  const res = await fetch("http://localhost:3000/api/climb_center");

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

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div>
      <h1>Climb</h1>

      <h2 className="text-lg font-semibold">암장 목록</h2>
      <ul className="space-y-4">
        {climbCenters.map((climbCenter) => (
          <li key={climbCenter.id}>
            <h3>{climbCenter.name}</h3>
            <ul className="space-y-2">
              {climbCenter.climb_center_sector.map((sector) => (
                <li key={sector.id}>{sector.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="max-w-sm border p-6 mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default ClimbPage;
