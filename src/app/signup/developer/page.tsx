import DeveloperProfileSetup from "@/components/dev/DeveloperProfile";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) {
    return redirect("api/auth/signin");
  }
  return (
    <DeveloperProfileSetup userId={session.user.id}></DeveloperProfileSetup>
  );
}

export default page;
