"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
interface GetStartedProps {
  userId: string;
}

const GetStarted: React.FC<GetStartedProps> = ({ userId }) => {
  const { data } = api.dev.getById.useQuery({ id: userId });
  const { data: data2 } = api.founder.getById.useQuery({ id: userId });
  if (data || data2) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        What best describes you?
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        <Card className="w-full max-w-sm sm:w-64">
          <CardHeader>
            <CardTitle>Developer</CardTitle>
            <CardDescription>
              I&apos;m looking for exciting projects to work on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/signup/developer">Choose Developer</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm sm:w-64">
          <CardHeader>
            <CardTitle>Founder</CardTitle>
            <CardDescription>
              I&apos;m looking for talented developers for my startup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/signup/founder">Choose Founder</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetStarted;
