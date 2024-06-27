import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const headersList = headers();
  const host = headersList.get("X-Forwarded-Host");
  redirect(`/climb`);
}
