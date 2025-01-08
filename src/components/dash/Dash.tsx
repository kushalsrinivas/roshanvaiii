"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

// import { ApplicationModal } from "@/components/application-modal";
// import { ApplicationsList } from "@/components/applications-list";

import { redirect } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";
interface GetStartedProps {
  userId: string;
}

export interface FounderProfile {
  id: number; // Primary key, auto-generated
  userId: string; // User ID (required)
  userName: string; // User's name (required)
  startupName: string; // Startup name (required)
  description: string; // Description of the startup (required)
  stage: string; // Startup stage (required)
  requirements: string; // Requirements or needs for the startup (required)
  budget: string; // Budget category (required)
  pitchDeck: string; // Optional link to a pitch deck or website
  createdById: string; // ID of the creator (required)
  createdAt: Date; // Timestamp when the record was created
  updatedAt?: Date | null; // Timestamp when the record was last updated
}
export default function DashboardMain({ userId }: GetStartedProps) {
  const [userType, setUserType] = useState<"developer" | "founder">(
    "developer",
  );
  const [searchTerm, setSearchTerm] = useState("");

//   const [applicationModalOpen, setApplicationModalOpen] = useState(false);

//   const [applications, setApplications] = useState<
//     { projectId: number; developerId: number; coverLetter: string }[]
//   >([]);

  const { data: founderProjects = [] } = api.founder.getAll.useQuery();
  const { data: devs = [] } = api.dev.getAll.useQuery();
//   const [selectedProject, setSelectedProject] = useState<FounderProfile>();

//   //   const handleApply = (project: FounderProfile) => {
//   //     setSelectedProject(project);
//   //     setApplicationModalOpen(true);
//   //   };

//   const handleSubmitApplication = (coverLetter: string) => {
//     if (selectedProject) {
//       const newApplication = {
//         projectId: selectedProject.id,
//         developerId: 1, // Assuming the current user is the first developer
//         coverLetter,
//       };
//       setApplications([...applications, newApplication]);
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => redirect("api/auth/signout")}>logout</Button>
      </div>

      <Tabs
        defaultValue={userType}
        onValueChange={(value) => setUserType(value as "developer" | "founder")}
      >
        <TabsList>
          <TabsTrigger value="developer">Developer View</TabsTrigger>
          <TabsTrigger value="founder">Founder View</TabsTrigger>
        </TabsList>

        <div className="my-4">
          <Input
            placeholder={`Search ${userType === "developer" ? "projects" : "developers"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="developer">
          {founderProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {founderProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.startupName}</CardTitle>
                    <CardDescription>
                      <div className="mt-2 flex items-center">
                        <span>{project.stage}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{project.description}</p>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {project.requirements}
                    </div>
                    <p className="font-semibold">Budget: {project.budget}</p>
                    <div className="mt-4 flex items-center justify-between">
                      {/* <Button onClick={() => handleApply(project)}>
                        Apply Now
                      </Button> */}
                      <Button>Apply Now</Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>hahah</div>
          )}
        </TabsContent>

        <TabsContent value="founder">
          <div className="space-y-8">
            {devs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devs.map((dev) => (
                  <Card key={dev.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-10 w-10">
                            <AvatarFallback>{dev.userName}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{dev.userName}</CardTitle>
                            <CardDescription>
                              {dev.experienceLevel} experience
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {dev.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p>Availability: {dev.availability}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button asChild>
                          <Link href={`/developer/${dev.userId}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div>hahah</div>
            )}
            {/* <ApplicationsList userId={userId} /> */}
          </div>
        </TabsContent>
      </Tabs>

      {/* <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        onSubmit={handleSubmitApplication}
        userId={userId}
        project={selectedProject!}
      /> */}
    </div>
  );
}
