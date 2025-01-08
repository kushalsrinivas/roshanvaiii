"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const interestTags = [
  "AI",
  "Machine Learning",
  "Web Development",
  "Mobile Apps",
  "Blockchain",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "SaaS",
  "IoT",
  "AR/VR",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
];

export default function InterestTagsPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = () => {
    // Handle submission of selected tags
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Select Your Interests</h1>
        <p className="text-gray-600">
          Choose tags that match your interests to enhance discoverability
        </p>
        <div className="flex flex-wrap gap-2">
          {interestTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
}
