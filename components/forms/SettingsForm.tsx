"use client";

import { formSchema } from "@/lib/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { CreatePage } from "@/lib/page";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { editUserSchema } from "@/lib/validations/user";
import { Input } from "../ui/input";
import Image from "next/image";
import { UploadButton } from "@/lib/utils/uploadthing";
import { Button, buttonVariants } from "../ui/button";
import { UpdateUser } from "@/lib/user";

type UserSettingsProps = {
  name: string;
  clerkId: string
  email: string;
  profileImage: string;
};

const SettingsForm = ({ user }: { user: UserSettingsProps }) => {

  const [profileImage, setProfileImage] = useState<string>(user.profileImage);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      profileImage: profileImage,
    },
  });

  async function onSubmit(data: z.infer<typeof editUserSchema>) {
    await UpdateUser(user.clerkId, data);
    console.log("FORM DATA", data);
  }

  function onError(errors: any) {
    console.log("FORM ERRORS", errors);
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-hrf" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FieldGroup>
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Profile Image */}
              <Image
                src={profileImage}
                alt="Profile Image"
                width={50}
                height={50}
                className="rounded-full"
              />
              <Controller
                name="profileImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Profile Image
                    </FieldLabel>
                    <Input type="hidden" {...field} />

                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={async(res) => {
                        const uploadedUrl = res[0].ufsUrl;

                        // connect uploadthing to react-hook-form
                        setProfileImage(uploadedUrl);
                        field.onChange(uploadedUrl);

                        toast.success("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-hrf">
            Save Changes
          </Button>
        </Field>
      </CardFooter>
      </Card>
    </main>
  );
};

export default SettingsForm;
