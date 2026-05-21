
import {
  Controller,
  FieldPath,
  FieldValues,
  Control,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "../ui/input";

type NumberInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    description?: string;
    placeholder?: string;
}

const NumberFormInput = <T extends FieldValues>({
    control,
    name,
    label,
    description,    
    placeholder,        
}: NumberInputProps<T>) => {

    
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-demo-title">{label}</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            type="number"
            value={field.value ?? ""}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default NumberFormInput
