"use client";

import { climbingCenterSchema } from "@/app/api/climb-center/schema";
import Link from "next/link";
import { z } from "zod";

type ClimbCenter = z.infer<typeof climbingCenterSchema>;

type Props = {
  climbCenters: ClimbCenter[];
};

const ClimbCenterSection = ({ climbCenters }: Props) => {
  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <ul className="flex flex-col gap-2">
        {climbCenters.map((climbCenter) => (
          <li key={climbCenter.id}>
            <Link
              className="flex items-center justify-between p-4 bg-white rounded-md hover:bg-slate-100"
              href={`/climb/${climbCenter.id}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{climbCenter.name}</span>
                <span className="text-sm text-gray-500">
                  {climbCenter.address}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClimbCenterSection;
