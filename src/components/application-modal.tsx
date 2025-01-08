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
export interface FounderProfile {
  id: number; // Primary key, auto-generated
  userId: string; // User ID (required)
  userName: string; // User's name (required)
  startupName: string; // Startup name (required)
  description: string; // Description of the startup (required)
  stage: string; // Startup stage (required)
  requirements: string; // Requirements or needs for the startup (required)
  budget: string; // Budget category (required)
  pitchDeck?: string; // Optional link to a pitch deck or website
  createdById: string; // ID of the creator (required)
  createdAt: Date; // Timestamp when the record was created
  updatedAt?: Date | null; // Timestamp when the record was last updated
}
interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (coverLetter: string) => void;
  project: FounderProfile;

  userId: string;
}

export function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  project,
}: ApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = () => {
    onSubmit(coverLetter);
    setCoverLetter("");
    onClose();
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
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
