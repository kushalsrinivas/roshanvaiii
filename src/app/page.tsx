import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

import { auth } from "@/server/auth";

export default async function WelcomePage() {
  const session = await auth();
  if (!session) {
    return redirect("api/auth/signin");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="mb-4 text-5xl font-bold">ConnectTech</h1>
      <p className="mb-8 text-xl">Connecting Founders and Developers</p>
      <div className="space-x-4">
        <Link href="/signup">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
