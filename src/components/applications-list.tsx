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

// Define the types for projects, developers, and applications
interface Project {
  id: number;
  name: string;
}

interface Developer {
  id: number;
  name: string;
  avatar?: string; // Avatar is optional
}

interface Application {
  projectId: number;
  developerId: number;
  coverLetter: string;
}

interface ApplicationsListProps {
  applications: Application[];
  projects: Project[];
  developers: Developer[];
}

export function ApplicationsList({
  applications,
  projects,
  developers,
}: ApplicationsListProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Retrieve project name by ID
  const getProjectName = (projectId: number): string => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  // Retrieve developer information by ID
  const getDeveloperInfo = (developerId: number): Developer => {
    const developer = developers.find((d) => d.id === developerId);
    return (
      developer ?? {
        id: 0,
        name: "Unknown Developer",
        avatar: "https://via.placeholder.com/50",
      }
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-2xl font-bold">Applications</h2>
      {applications.map((application) => {
        const developer = getDeveloperInfo(application.developerId);

        return (
          <Card
            key={`${application.projectId}-${application.developerId}`} // Unique key for each application
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage
                      src={developer.avatar ?? ""}
                      alt={developer.name}
                    />
                    <AvatarFallback>
                      {developer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{developer.name}</CardTitle>
                    <CardDescription>
                      {getProjectName(application.projectId)}
                    </CardDescription>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedApplication(application)}>
                      View Application
                    </Button>
                  </DialogTrigger>
                  {selectedApplication &&
                    selectedApplication.projectId === application.projectId &&
                    selectedApplication.developerId ===
                      application.developerId && (
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Application from {developer.name}
                          </DialogTitle>
                          <DialogDescription>
                            For project: {getProjectName(application.projectId)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <h4 className="mb-2 font-semibold">Cover Letter:</h4>
                          <p className="text-sm">{application.coverLetter}</p>
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
  );
}
