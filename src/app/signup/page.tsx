
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import GetStarted from "@/components/registration/GetStarted";

export default async function RoleSelectionPage() {
  const session = await auth();
  if (!session) {
    return redirect("api/auth/signin");
  }
  return <GetStarted userId={session.user.id} />;
}
