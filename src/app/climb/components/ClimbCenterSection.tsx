import { ClimbCenter } from "@/types";
import { groupByBrand } from "@/utils/climb";
import Link from "next/link";

type Props = {
  climbCenters: ClimbCenter[];
};

const ClimbCenterSection = async ({ climbCenters }: Props) => {
  const climbCenterGroup = groupByBrand(climbCenters);

  return (
    <section className="flex flex-col gap-6 px-6 py-6 bg-white">
      <h1 className="text-lg font-bold">클라이밍 센터</h1>
      <ul className="flex flex-col gap-4">
        {Object.entries(climbCenterGroup).map(([brandName, climbCenters]) => (
          <li key={brandName} className="flex flex-col gap-2">
            <h2 className="text-lg font-bold bg-slate-100 border border-slate-200 p-3 rounded-lg">
              {brandName}
            </h2>
            <ul className="flex flex-col gap-2">
              {climbCenters.map((climbCenter) => (
                <li key={climbCenter.id}>
                  <Link
                    className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-slate-100"
                    href={`/climb/${climbCenter.id}`}
                  >
                    <div className="w-full flex flex-col gap-1">
                      <span className="font-medium">{climbCenter.name}</span>
                      <span className="text-sm text-slate-500">
                        {climbCenter.address}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClimbCenterSection;
