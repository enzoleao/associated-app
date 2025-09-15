"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ControlledColorPickerProps {
  control: any;
  name: string;
  label: string;
}

export function ControlledColorPicker({ control, name, label }: ControlledColorPickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Label>{label}</Label>
          <div className="flex justify-center items-center gap-2 flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-full"
                  style={{ backgroundColor: field.value || "#000000" }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <HexColorPicker color={field.value || "#000000"} onChange={field.onChange} />
              </PopoverContent>
            </Popover>

            <Input
              type="text"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              className="border rounded-md px-2 py-1 w-28 text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}
    />
  );
}
