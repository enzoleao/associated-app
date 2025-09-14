"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { ptBR } from 'date-fns/locale'  
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

interface DatePickerFieldProps {
  name: string
  control: any
  label?: string
  error?: string
}

export function DatePickerField({ name, control, label, error }: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex flex-col w-full justify-center">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "relative w-full h-[46px] rounded-sm border text-base md:text-sm transition",
                  "border-gray-300",
                  !field.value && "text-muted-foreground",
                  error && "border-red-500",
                  "focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/50", 
                  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  "flex justify-start items-center placeholder:text-gray-400", 
                  "px-2 hover:bg-white cursor-text"
                )}
              >
                {field.value ? format(field.value, "dd/MM/yyyy") : <span className="text-gray-400">Selecionar data</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  setIsOpen(false) 
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
