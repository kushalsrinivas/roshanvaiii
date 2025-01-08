"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Star } from "lucide-react";
import { api } from "@/trpc/react";

export default function DeveloperProfile() {
  const params = useParams();
  const { data: developer, isLoading } = api.dev.getById.useQuery({
    id: params.id as string,
  });

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!developer) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-xl font-bold">Developer not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage alt={developer.userName} />
              <AvatarFallback>{developer.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{developer.userName}</CardTitle>
              <CardDescription>
                Experience Level: {developer.experienceLevel}
              </CardDescription>
              <div className="mt-2 flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                <span>
                  GitHub:{" "}
                  <a
                    href={developer.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {developer.githubLink}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {developer.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Availability:</span>
                      <span>{developer.availability}</span>
                    </div>
                    {developer.portfolioLinks && (
                      <div>
                        <h3 className="mt-4 font-semibold">Portfolio:</h3>
                        <ul className="ml-6 list-disc">
                          {developer.portfolioLinks}
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button className="mt-4 w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="createdAt" className="mt-6">
            <TabsList>
              <TabsTrigger value="createdAt">Profile Created</TabsTrigger>
              <TabsTrigger value="updatedAt">Last Updated</TabsTrigger>
            </TabsList>
            <TabsContent value="createdAt">
              <p>
                Profile created on:{" "}
                {new Date(developer.createdAt).toLocaleString()}
              </p>
            </TabsContent>
            <TabsContent value="updatedAt"></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
