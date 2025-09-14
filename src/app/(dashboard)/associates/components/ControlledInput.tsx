"use client";

import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldPath, FieldValues, ControllerProps } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ControlledInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  rules?: ControllerProps<T>["rules"];
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  ...props
}: ControlledInputProps<T>) {
  return (
    <Controller<T>
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Input
            {...field}
            {...props}
            id={name}
            value={field.value ?? ""}
            className={cn(
              "h-[46px] rounded-md",
              error && "border-red-500 focus-visible:ring-red-500"
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