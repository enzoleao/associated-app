"use client"

import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

function maskDate(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1")
}

export function DatePickerField({ control, name, error }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        // mantém input sincronizado com o valor do formulário
        useEffect(() => {
          if (field.value instanceof Date && !isNaN(field.value.getTime())) {
            setInputValue(format(field.value, "dd/MM/yyyy"))
          } else {
            setInputValue("")
          }
        }, [field.value])

        return (
          <div className="flex flex-col w-full">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Input
                    value={inputValue}
                    onChange={(e) => {
                      const masked = maskDate(e.target.value)
                      setInputValue(masked)

                      // se completou dd/MM/yyyy, já atualiza o calendário
                      if (masked.length === 10) {
                        const parsed = parse(masked, "dd/MM/yyyy", new Date())
                        if (!isNaN(parsed.getTime())) {
                          field.onChange(parsed)
                        }
                      }
                    }}
                    onBlur={() => {
                      const parsed = parse(inputValue, "dd/MM/yyyy", new Date())
                      if (!isNaN(parsed.getTime())) {
                        field.onChange(parsed)
                      } else {
                        field.onChange(undefined)
                      }
                    }}
                    placeholder="dd/mm/aaaa"
                    className={cn(
                      "w-full h-[46px] pr-10",
                      error && "border-red-500"
                    )}
                    onClick={() => setIsOpen(true)}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  locale={ptBR}
                  mode="single"
                  selected={field.value}
                  month={field.value || undefined}
                  defaultMonth={field.value || new Date()}
                  onSelect={(date) => {
                    field.onChange(date)
                    if (date) {
                      setInputValue(format(date, "dd/MM/yyyy"))
                      setIsOpen(false)
                    }
                  }}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            {error && (
              <span className="text-red-500 text-xs mt-1">{error.message}</span>
            )}
          </div>
        )
      }}
    />
  )
}
