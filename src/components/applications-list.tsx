"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";

// Define the types for projects, developers, and applications
interface Project {
  id: number;
  userId: string;
  userName: string;
  startupName: string;
  description: string;
  stage: string;
  requirements: string;
  budget: string;
  pitchDeck: string;
}

interface Developer {
  id: number;
  userId: string;
  userName: string;
  skills: string[]; // Array of skills
  experienceLevel: string;
  githubLink: string;
  portfolioLinks?: string | null; // Optional
  availability: string;
}

interface Application {
  id: number;
  coverLetter: string;
  createdAt: Date;
  updatedAt: Date | null;
  project: Project; // Nested project details
  developer: Developer; // Nested developer details
}
interface ApplicationsListProps {
  userId: string;
}

export function ApplicationsList({ userId }: ApplicationsListProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Retrieve project name by ID

  const applications =
    api.application.getByProjectId.useQuery({ projectId: userId }).data ?? [];
  // Retrieve developer information by ID

  return (
    <div>
      {applications.length > 0 ? (
        <div className="space-y-4">
          <h2 className="mb-4 text-2xl font-bold">Applications</h2>
          {applications.map((application) => {
            return (
              <Card
                key={`${application.id}-${application.id}`} // Unique key for each application
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-10 w-10">
                        <AvatarImage />
                        <AvatarFallback>
                          {application.developer.userName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{application.developer.userName}</CardTitle>
                        <CardDescription>
                          {application.project.startupName}
                        </CardDescription>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedApplication(application)}
                        >
                          View Application
                        </Button>
                      </DialogTrigger>
                      {selectedApplication &&
                        selectedApplication.project.userId ===
                          application.project.userId &&
                        selectedApplication.developer.userId ===
                          application.developer.userId && (
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Application from{" "}
                                {application.developer.userName}
                              </DialogTitle>
                              <DialogDescription>
                                For project: {application.project.startupName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <h4 className="mb-2 font-semibold">
                                Cover Letter:
                              </h4>
                              <p className="text-sm">
                                {application.coverLetter}
                              </p>
                            </div>
                          </DialogContent>
                        )}
                    </Dialog>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      ) : (
        <div>no applications yet</div>
      )}
    </div>
  );
}
