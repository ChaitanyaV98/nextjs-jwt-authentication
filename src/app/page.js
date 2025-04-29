import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();

  if (!currentUser?.success) {
    redirect("/signin");
  }

  return (
    <div>
      <h1>Nextjs Authentication module</h1>
      <h2>{currentUser?.data?.userName}</h2>
      <p>{currentUser?.data?.email}</p>
      <Logout />
    </div>
  );
}
