import React from 'react'
import NumberFormInput from './shared/NumberFormInput'
import FormInput from './shared/FormInput'
import ImageUploadField from './shared/ImageUploadField'
import { FieldGroup } from './ui/field'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from './ui/button'
import z from 'zod'
import { formSchema } from '@/lib/validations/form'

const StartupFormCard = <T extends FieldValues>() => {

    const form = useFormContext<z.infer<typeof formSchema>>();
    const {fields, remove, append} = useFieldArray({
        control: form.control,
        name: "startups"
    })

  return (
    <div>
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
    </div>
  )
}

export default StartupFormCard
