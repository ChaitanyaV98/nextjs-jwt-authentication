"use client";

import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions";

const handleLogout = async () => {
  console.log("Clicked on logout button");
  await logoutAction();
};

function Logout() {
  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
