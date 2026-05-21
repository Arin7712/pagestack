"use client";

import { formSchema } from "@/lib/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import z from "zod";

import { Button } from "../ui/button";
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
  FieldGroup,
} from "@/components/ui/field";
import { CreatePage } from "@/lib/page";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { User } from "@/generated/prisma/client";
import FormInput from "../shared/FormInput";
import ImageUploadField from "../shared/ImageUploadField";
import TextAreaField from "../shared/TextAreaField";
import StartupFormCard from "../StartupFormCard";

type CreatePageProps = User;

const CreatePageForm = ({ user }: { user: CreatePageProps }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      markdown: "",
      favIcon: user.profileImage || "",
      startups: [
        {
          name: "",
          favIcon: "",
          description: "",
          navLink: "",
          revenue: undefined,
          userCount: undefined,
        },
      ],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await CreatePage(data);
    toast("Page created successfully.");
    router.push("/dashboard");
  }

  function onError(errors: FieldErrors<z.infer<typeof formSchema>>) {
    console.log("FORM ERRORS", errors);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Page</CardTitle>
        <CardDescription>Create your startup page</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form id="form-hrf" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FieldGroup>
              {/* Page Favicon */}
              <ImageUploadField
                name="favIcon"
                control={form.control}
                label="Page Favicon"
                alt="Page Favicon"
                size={50}
              />

              {/* Name */}
              <FormInput
                name="name"
                control={form.control}
                label="Page Name"
                placeholder="John Doe"
              />

              {/* Description */}
              <FormInput
                name="description"
                control={form.control}
                label="Page Description"
                description="Tell us how awesome you are."
                placeholder="Hey there! This is John"
              />

              {/* Markdown */}
              <TextAreaField
                name="markdown"
                control={form.control}
                label="Page Markdown"
                description="Tell us how awesome you are."
                placeholder="Hey there! This is John"
              />
              
              <StartupFormCard />
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-hrf" disabled={form.formState.isSubmitting}>
            Create
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CreatePageForm;
