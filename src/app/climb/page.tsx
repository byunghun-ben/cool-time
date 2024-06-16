import Link from "next/link";
import { getClimbCenters } from "./apis";

const ClimbPage = async () => {
  const climbCenters = await getClimbCenters();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <section className="flex flex-col gap-6 px-6 py-6">
        <h2 className="text-xl font-black">암장 목록</h2>

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
