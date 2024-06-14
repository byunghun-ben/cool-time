import { successResponseSchema } from "@/lib/apiResponse";
import Link from "next/link";
import { climbingCenterSchema } from "../api/climb-center/schema";

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

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <section className="flex flex-col gap-6 px-6 py-6">
        <h2 className="text-lg font-semibold">암장 목록</h2>

        <ul className="flex flex-col gap-4">
          {climbCenters.map((climbCenter) => (
            <li key={climbCenter.id}>
              <Link
                href={`/climb/${climbCenter.id}`}
                className="flex border border-slate-200 rounded-lg p-4"
              >
                <span>{climbCenter.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ClimbPage;
