"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

// Define the state interface
interface FounderProfileState {
  userName: string;
  userId: string;
  startupName: string;
  description: string;
  stage: string;
  requirements: string;
  budget: string;
  pitchDeck: string;
}
interface GetStartedProps {
  userId: string;
}
export default function FounderProfileSetup({ userId }: GetStartedProps) {
  const router = useRouter();

  // State initialization
  const [formState, setFormState] = useState<FounderProfileState>({
    userName: "",
    userId: userId,
    startupName: "",
    description: "",
    stage: "",
    requirements: "",
    budget: "",
    pitchDeck: "",
  });
  const data = api.founder.create.useMutation();

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  // Handle select change
  const handleSelectChange =
    (field: keyof FounderProfileState) => (value: string) => {
      setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., validation, API calls)
    console.log(formState);
    data.mutate(formState);
    router.push("/signup/interests");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">Founder Profile Setup</h1>
        <div>
          <Label htmlFor="startupName">User Name</Label>
          <Input
            id="userName"
            placeholder="Your  Name"
            value={formState.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="startupName">Startup Name</Label>
          <Input
            id="startupName"
            placeholder="Your Startup Name"
            value={formState.startupName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="description">Startup Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of your startup"
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="stage">Startup Stage</Label>
          <Select onValueChange={handleSelectChange("stage")}>
            <SelectTrigger>
              <SelectValue placeholder="Select startup stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Stage</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="seed">Seed Funded</SelectItem>
              <SelectItem value="series-a">Series A+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="requirements">Developer Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="Skills and experience needed"
            value={formState.requirements}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Select onValueChange={handleSelectChange("budget")}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$0 - $5,000">$0 - $5,000</SelectItem>
              <SelectItem value="$5,000 - $20,000">$5,000 - $20,000</SelectItem>
              <SelectItem value="$20,000+">$20,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pitchDeck">Pitch Deck or Website Link</Label>
          <Input
            id="pitchDeck"
            placeholder="https://your-pitch-deck.com"
            value={formState.pitchDeck}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
