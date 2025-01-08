"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";

export interface FounderProfile {
  id: number;
  userId: string;
  userName: string;
  startupName: string;
  description: string;
  stage: string;
  requirements: string;
  budget: string;
  pitchDeck?: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: FounderProfile;
  userId: string; // Current developer's user ID
  // Current developer's ID
}

export function ApplicationModal({
  isOpen,
  onClose,
  project,
  userId,
}: ApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = api.application.create.useMutation();

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      alert("Please write a cover letter before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      data.mutate({
        projectId: project.userId,
        developerId: userId,
        coverLetter: coverLetter,
      });

      alert("Application submitted successfully!");
      setCoverLetter("");
      console.log(project.userId, userId, coverLetter);
      // Invalidate cache to refetch applications
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {project.startupName}</DialogTitle>
          <DialogDescription>
            Write a cover letter explaining why you&apos;re the best fit for
            this project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Your cover letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={10}
            disabled={isSubmitting}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
