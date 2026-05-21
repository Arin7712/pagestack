"use client";

import { formSchema } from "@/lib/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldErrors,
  FormProvider,
  useFieldArray,
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { CreatePage } from "@/lib/page";
import { toast } from "sonner";
import { UploadButton } from "@/lib/utils/uploadthing";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/generated/prisma/client";
import FormInput from "../shared/FormInput";
import NumberFormInput from "../shared/NumberFormInput";
import ImageUploadField from "../shared/ImageUploadField";

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

  const favIcon = form.watch("favIcon");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "startups",
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
              <Controller
                name="markdown"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Markdown
                    </FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="# Hey there! This is John"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="button"
                onClick={() => {
                  append({
                    name: "",
                    favIcon: "",
                    description: "",
                    navLink: "",
                    revenue: 0,
                    userCount: 0,
                  });
                }}
              >
                Add Startup
              </Button>
              {fields.map((item, index) => (
                <div key={item.id}>
                  <FieldGroup>
                    {/* Startup Name */}
                    <FormInput
                      name={`startups.${index}.name`}
                      control={form.control}
                      label="Startup Name"
                      placeholder="Nvidia"
                    />

                    {/* Startup Description */}
                    <FormInput
                      name={`startups.${index}.description`}
                      control={form.control}
                      label="Startup Description"
                      placeholder="We are the first to hit a market cap of $5 trillion"
                    />

                    {/* Startup FavIcon */}
                    <ImageUploadField
                      control={form.control}
                      name={`startups.${index}.favIcon`}
                      label="Startup Favicon"
                    />

                    {/* Startup Link */}
                    <FormInput
                      name={`startups.${index}.navLink`}
                      control={form.control}
                      label="Startup Link"
                      description="Help us find you"
                    />

                    {/* Startup Revenue */}
                    <NumberFormInput
                      name={`startups.${index}.revenue`}
                      control={form.control}
                      label="Startup Revenue"
                      description="How much revenue do you generate?"
                      placeholder="0"
                    />

                    {/* Startup User Count */}
                    <NumberFormInput
                      name={`startups.${index}.userCount`}
                      control={form.control}
                      label="Startup User Count"
                      description="How many users do you have?"
                      placeholder="0"
                    />
                  </FieldGroup>
                  <Button onClick={() => remove(index)} type="button">
                    Remove
                  </Button>
                </div>
              ))}
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-hrf">
            Create
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CreatePageForm;
