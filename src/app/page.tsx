import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function Home() {
  redirect(`${BASE_URL}/climb`);
}
