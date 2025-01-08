// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { api } from "@/trpc/react";
// interface GetStartedProps {
//   userId: string;
// }
// export default function DeveloperProfileSetup({ userId }: GetStartedProps) {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     userId: userId,
//     skills: "",
//     experienceLevel: "",
//     githubLink: "",
//     portfolioLinks: "",
//     availability: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSelectChange = (key: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null;
//     if (file && file.type !== "application/pdf") {
//       alert("Please upload a PDF file.");
//       return;
//     }
//     setFormData((prev) => ({ ...prev, resume: file }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Assuming you have a tRPC mutation to handle form submission
//     const data = api.dev.create.useMutation(formData);
//     router.push("/signup/interests");
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow"
//       >
//         <h1 className="mb-6 text-2xl font-bold">Developer Profile Setup</h1>

//         <div>
//           <Label htmlFor="skills">Skills</Label>
//           <Input
//             id="skills"
//             placeholder="e.g. React, Node.js, Python"
//             value={formData.skills}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="experienceLevel">Experience Level</Label>
//           <Select
//             onValueChange={(value) =>
//               handleSelectChange("experienceLevel", value)
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select experience level" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Junior">Junior</SelectItem>
//               <SelectItem value="Mid">Mid</SelectItem>
//               <SelectItem value="Senior">Senior</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Button type="submit" className="w-full">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

interface FormData {
  userId: string;
  skills: string[];
  experienceLevel: string;
  githubLink: string;
  portfolioLinks: string;
  availability: string;
  userName: string;
}
interface GetStartedProps {
  userId: string;
}

export default function DeveloperProfileSetup({ userId }: GetStartedProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userId: userId,
    skills: ["React", "Node.js", "Python"],
    experienceLevel: "",
    githubLink: "",
    portfolioLinks: "",
    availability: "",
    userName: "",
  });
  const data = api.dev.create.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming you have a tRPC mutation to handle form submission
    data.mutate(formData);
    router.push("/signup/interests");
  };
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const skillsArray = value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">Developer Profile Setup</h1>
        <div>
          <Label htmlFor="skills">user name</Label>
          <Input
            id="userName"
            placeholder="e.g. React, Node.js, Python"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            placeholder="e.g. React, Node.js, Python"
            value={formData.skills}
            onChange={handleSkillsChange}
          />
        </div>

        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("experienceLevel", value)
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  formData.experienceLevel || "Select experience level"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior (6+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="githubLink">Github Link</Label>
          <Input
            id="githubLink"
            placeholder="https://github.com/username"
            value={formData.githubLink}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="portfolioLinks">Portfolio Links</Label>
          <Input
            id="portfolioLinks"
            placeholder="https://your-portfolio.com"
            value={formData.portfolioLinks}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select
            onValueChange={(value) => handleSelectChange("availability", value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={formData.availability || "Select availability"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
