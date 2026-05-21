import { Controller, FieldPath, FieldValues, Control } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "../ui/input";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type,
}: FormInputProps<T>) => {
  const parseNumberInput = (value: string) => {
    return value === "" ? undefined : Number(value);
  };
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
            type={type}
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(parseNumberInput(e.target.value));
            }}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormInput;
