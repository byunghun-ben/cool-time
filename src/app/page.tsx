import { headers } from "next/headers";

export default function Home() {
  const headersList = headers();
  const host = headersList.get("X-Forwarded-Host");
  return (
    <div>
      <h1>Home</h1>
      {/* <button onClick={handleClick}>Go to Climb</button> */}
    </div>
  );
  // redirect(`${host}/climb`);
}
