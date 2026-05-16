"use client";

import { formSchema } from "@/lib/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { useState } from "react";
import { CreatePage } from "@/lib/page";
import { toast } from "sonner";
import { UploadButton } from "@/lib/utils/uploadthing";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Page, User } from "@/generated/prisma/client";


type CreatePageProps = User;
const CreatePageForm = ({ user }: { user: CreatePageProps }) => {
  const [favIcon, setFavIcon] = useState<string>(user.profileImage || '');

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      markdown: "",
      favIcon: favIcon,
      startups: [
        {
          name: "",
          favIcon: "",
          description: "",
          navLink: "",
          revenue: 0,
          userCount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "startups",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await CreatePage(data);
    toast("Page created successfully.");
    router.push("/pages");
    console.log("FORM DATA", data);
  }

  function onError(errors: any) {
    console.log("FORM ERRORS", errors);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Page</CardTitle>
        <CardDescription>Create your startup page</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-hrf"
          action=""
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <FieldGroup>
            {/* Page Favicon */}

            <div className="flex items-center justify-between gap-6">
              
              <Image
                src={favIcon}
                alt="Page Favicon"
                width={50}
                height={50}
                className="rounded-full"
              />

              <Controller
                name="favIcon"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Page Favicon
                    </FieldLabel>
                    <Input type="hidden" {...field} />

                    <UploadButton
                      className="border rounded-lg"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        const uploadedUrl = res[0].ufsUrl;

                        // connect uploadthing to react-hook-form
                        setFavIcon(uploadedUrl);
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
            </div>

            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Page Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Page Description
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
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
                    placeholder="Login button not working on mobile"
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
              <div key={index}>
                <FieldGroup>
                  <Controller
                    name={`startups.${index}.name`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Startup Name
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name={`startups.${index}.description`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Startup Description
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Startup FavIcon */}

                  <Image
                    src={
                      form.watch(`startups.${index}.favIcon`) ||
                      ''
                    }
                    alt="Profile Image"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <Controller
                    name={`startups.${index}.favIcon`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Profile Image
                        </FieldLabel>
                        <Input type="hidden" {...field} />

                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            const uploadedUrl = res[0].ufsUrl;

                            // connect uploadthing to react-hook-form
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
                  <Controller
                    name={`startups.${index}.navLink`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Startup Link
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name={`startups.${index}.revenue`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Startup Revenue
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                          type="number"
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name={`startups.${index}.userCount`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Startup User Count
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                          type="number"
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <Button onClick={() => remove(index)} type="button">
                  Remove
                </Button>
              </div>
            ))}
          </FieldGroup>
        </form>
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
