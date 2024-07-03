import { getURL } from "@/lib/utils";
import { createServerClient } from "@supabase/ssr";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClimbCenter, getUser, getVisitRecords } from "../apis/server";
import CooltimeSection from "./components/CooltimeSection";
import VisitRecordSection from "./components/VisitRecordSection";

const url = getURL();

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const climbCenterId = Number(params.id);
  const climbCenter = await getClimbCenter(climbCenterId);

  if (!climbCenter) {
    return {
      title: "클타임",
      description: "내가 탄 벽을 기록하고, 쿨타임을 관리하세요",
    };
  }

  return {
    title: `${climbCenter.name} - 클타임`,
    description: `${climbCenter.name}의 다음 세팅일은 언제일까요? 모든 벽이 바뀌는 날을 기다리며, 내가 탄 벽을 기록하고, 쿨타임을 관리하세요`,
    authors: [
      { name: "@de.gu.r.r", url: "https://www.instagram.com/de.gu.r.r/" },
    ],
    keywords: [
      "클라이밍",
      "클라이밍센터",
      "쿨타임",
      "볼더링",
      "리드",
      "클타임",
      "실내 클라이밍",
      "실내 클라이밍센터",
      "실내 클라이밍장",
    ],
    openGraph: {
      type: "website",
      url: `${url}/climb/${climbCenterId}`,
      title: `${climbCenter.name} - 클타임`,
      description: `${climbCenter.name}의 다음 세팅일은 언제일까요? 모든 벽이 바뀌는 날을 기다리며, 내가 탄 벽을 기록하고, 쿨타임을 관리하세요`,
    },
  };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return null;
        },
      },
    }
  );
  const { data: climbCenters, error } = await supabase
    .from("climb_center")
    .select("id");

  if (error) {
    console.error("supabase Error", error);
    return [];
  }

  return climbCenters.map((climbCenter) => ({ id: String(climbCenter.id) }));
}

const ClimbCenterDetailPage = async ({ params: { id } }: Props) => {
  const climbCenterId = Number(id);
  const user = await getUser();

  const [climbCenter, visitRecords] = await Promise.all([
    getClimbCenter(climbCenterId),
    getVisitRecords({ userId: user?.id }),
  ]);

  if (!climbCenter) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden bg-slate-100 px-3 pt-4 pb-10">
      <section className="flex flex-col gap-2 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-black">{climbCenter.name}</h1>
        <p className="text-sm text-slate-700">{climbCenter.address}</p>
        <Link
          href={climbCenter.instagramUrl}
          target="_blank"
          rel="noopener"
          className="text-sm text-slate-500 mr-auto"
        >
          인스타그램
        </Link>
      </section>

      <CooltimeSection
        sectors={climbCenter.sectors}
        visitRecords={visitRecords}
      />

      <VisitRecordSection
        climbCenter={climbCenter}
        userId={user?.id}
        visitRecords={visitRecords}
      />
    </div>
  );
};

export default ClimbCenterDetailPage;
