import Image from "next/image";
import { Button } from "../ui/button";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UploadButton } from "@/lib/utils/uploadthing";
import { toast } from "sonner";
import { formSchema } from "@/lib/validations/form";

type ImageUploadFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;

  remove?: boolean;
  alt?: string;
  size?: number;
};

const ImageUploadField = <T extends FieldValues>({
  name,
  control,
  remove = false,
  label,
  alt = "*Image",
  size = 50,
}: ImageUploadFieldProps<T>) => {
  const form = useFormContext<T>();
  return (
    <div>
      <div>
        <Image
          src={form.watch(name) || "/user-avatar.png"}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full"
        />
        {remove && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              form.setValue(name, "" as FieldPathValue<T, FieldPath<T>>);
            }}
          >
            Remove
          </Button>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">{label}</FieldLabel>
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default ImageUploadField;
