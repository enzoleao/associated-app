"use client";

import { Control, Controller, FieldPath, FieldValues, ControllerProps } from "react-hook-form";
import { InputMask, InputMaskProps } from "@react-input/mask";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ControlledMaskedInputProps<T extends FieldValues> extends Omit<InputMaskProps, "value" | "onChange"> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  rules?: ControllerProps<T>["rules"];
}

export function ControlledMaskedInput<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  rules,
  ...props
}: ControlledMaskedInputProps<T>) {
  return (
    <Controller<T>
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <InputMask
            {...field}
            {...props}
            id={name}
            mask={mask}
            replacement={{ "_": /\d/ }}
            className={cn(
              "block w-full border rounded-md px-3 py-2 h-[46px] focus:outline-none focus:ring-2",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            )}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
