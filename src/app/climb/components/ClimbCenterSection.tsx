import { ClimbCenter } from "@/types";
import Link from "next/link";

type Props = {
  climbCenters: ClimbCenter[];
};

const ClimbCenterSection = async ({ climbCenters }: Props) => {
  // climbCenter를 브랜드 이름으로 그룹화
  const climbCentersByBrand = climbCenters.reduce((acc, climbCenter) => {
    if (!acc[climbCenter.brand.name]) {
      acc[climbCenter.brand.name] = [];
    }

    acc[climbCenter.brand.name].push(climbCenter);

    return acc;
  }, {} as Record<string, ClimbCenter[]>);

  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <ul className="flex flex-col gap-2">
        {Object.entries(climbCentersByBrand).map(
          ([brandName, climbCenters]) => (
            <li key={brandName} className="flex flex-col gap-4">
              <h2 className="text-xl font-bold bg-slate-100 p-3">
                {brandName}
              </h2>
              <ul className="flex flex-col gap-2">
                {climbCenters.map((climbCenter) => (
                  <li key={climbCenter.id}>
                    <Link
                      className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-slate-100"
                      href={`/climb/${climbCenter.id}`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">{climbCenter.name}</span>
                        <span className="text-sm text-gray-500">
                          {climbCenter.address}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default ClimbCenterSection;
