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

type UserSettingsProps = {
    name: string;
    email: string;
    profileImage: string;
}

const SettingsForm = ({user} : {user : UserSettingsProps}) => {

      const form = useForm<z.infer<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        },
      });

      async function onSubmit(data: z.infer<typeof editUserSchema>) {
        await CreatePage(data);
        toast("Page created successfully.");
        redirect("/pages");
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
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Name
                                    </FieldLabel>
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
                            
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default SettingsForm