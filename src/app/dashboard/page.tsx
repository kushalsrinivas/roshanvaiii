import DashboardMain from "@/components/dash/Dash";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) {
    redirect("api/auth/signin");
  }
  return <DashboardMain userId={session?.user.id}></DashboardMain>;
}

export default page;
