import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { z } from "zod";
import AddClimbCenterForm from "./components/AddClimbCenterForm";
import { Button } from "@/components/ui/button";

const getClimbingCenters = async () => {
  const climbingCenterSchema = z.object({
    id: z.number(),
    name: z.string(),
  });

  const supabase = createClient();

  const { data: climbingCenterData, error: climbingCentersError } =
    await supabase.from("climb_center").select(
      `
        *,
        climb_center_sector (*)
      `
    );

  return climbingCenterData || [];
};

const AdminPage = async () => {
  const climbingCenters = await getClimbingCenters();
  return (
    <div>
      <h1>Admin</h1>
      <div className="max-w-sm border p-6 mx-auto flex flex-col gap-10">
        <h2 className="text-lg font-semibold">암장 목록</h2>

        <ul className="space-y-4">
          {climbingCenters.map((climbingCenter) => (
            <li key={climbingCenter.id}>
              <Button variant="secondary" asChild>
                <Link href={`/admin/climb-centers/${climbingCenter.id}`}>
                  {climbingCenter.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-sm border p-6 mx-auto flex flex-col gap-10">
        <h2 className="text-lg font-semibold">암장 추가</h2>
        <AddClimbCenterForm />
      </div>
    </div>
  );
};

export default AdminPage;
