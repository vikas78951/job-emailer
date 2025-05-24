"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { toast } from "sonner"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Info } from "lucide-react";
import { useUserStore } from "@/src/stores/userStore";
import { useEffect } from "react";

// ------------------------
// Types
// ------------------------

export type Attachment = {
  name: string;
  size: number;
  type: string;
};

export type User = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  designation: string;
  linkedinUrl?: string;
  github?: string;
  portfolio?: string;
  certification?: string;
  attachments?: Attachment[];
};

// ------------------------
// Schema
// ------------------------
const FormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2).optional().or(z.literal("")),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  designation: z.string().min(2, "Designation is required."),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
  certification: z.string().url().optional().or(z.literal("")),
  attachments: z.any().optional(),
});

// ------------------------
// Default Values
// ------------------------
const defaultValues: z.infer<typeof FormSchema> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  designation: "",
  linkedinUrl: "",
  github: "",
  portfolio: "",
  certification: "",
  attachments: [],
};

const UserDetails = () => {
  const { user, setUser, clearUser } = useUserStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  // Keep form in sync with Zustand
  useEffect(() => {
    form.reset(user ?? defaultValues);
  }, [user, form]);

  // Submit handler
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const attachments =
      data.attachments?.map((file: File) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })) ?? [];

    setUser({
      ...data,
      linkedinUrl: data.linkedinUrl ?? "",
      github: data.github ?? "",
      portfolio: data.portfolio ?? "",
      certification: data.certification ?? "",
      lastName: data.lastName ?? "",
      attachments,
    });
    toast("User Detail updated");
  }

  // Reset form + state + localStorage
  function onReset() {
    form.reset(defaultValues);
    clearUser();
    localStorage.removeItem("user-store");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          User Details
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <Info size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>We do not store data in our database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Fill in your personal and professional details to personalize emails.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Required Fields */}
            {(
              [
                ["firstName", "First Name", "John"],
                ["lastName", "Last Name", "Doe"],
                ["email", "Email", "john@example.com"],
                ["password", "Password", "••••••••", "password"],
                ["designation", "Designation", "Frontend Developer"],
              ] as const
            ).map(([name, label, placeholder, type]) => (
              <FormField
                key={name}
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={placeholder}
                        type={type || "text"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Optional Fields */}
            {(
              [
                [
                  "linkedinUrl",
                  "LinkedIn",
                  "https://linkedin.com/in/yourprofile",
                ],
                ["github", "GitHub", "https://github.com/yourprofile"],
                ["portfolio", "Portfolio", "https://portfolio.site"],
                ["certification", "Certification", "https://certificate.link"],
              ] as const
            ).map(([name, label, placeholder]) => (
              <FormField
                key={name}
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Attachments */}
            <FormField
              name="attachments"
              control={form.control}
              render={({ field }) => {
                const currentFiles = field.value || [];

                const handleAddFiles = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const newFiles = Array.from(e.target.files || []);
                  const combinedFiles = [...currentFiles];

                  // Avoid duplicates by name
                  newFiles.forEach((file) => {
                    if (!combinedFiles.some((f) => f.name === file.name)) {
                      combinedFiles.push(file);
                    }
                  });

                  field.onChange(combinedFiles);
                  e.target.value = "";
                };

                const handleRemoveFile = (filename: string) => {
                  const filtered = currentFiles.filter(
                    (f: File) => f.name !== filename
                  );
                  field.onChange(filtered);
                };

                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Attachments</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        onChange={handleAddFiles}
                        placeholder="browse"
                      />
                    </FormControl>
                    <div className="mt-2 space-y-1">
                      {currentFiles.length > 0 &&
                        currentFiles.map((file: File, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-muted px-3 py-2 rounded text-sm"
                          >
                            <span className="truncate max-w-xs">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                              onClick={() => handleRemoveFile(file.name)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Buttons */}
            <div className="flex justify-between col-span-2 mt-4 md:mt-6">
              <Button variant="outline" type="reset" onClick={onReset}>
                Reset
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
