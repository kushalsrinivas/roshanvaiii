
import FounderProfileSetup from "@/components/founder/FounderProfile";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) {
    return redirect("api/auth/signin");
  }
  return <FounderProfileSetup userId={session.user.id}></FounderProfileSetup>;
}

export default page;
