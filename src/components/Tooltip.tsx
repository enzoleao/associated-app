import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface TooltipComponentProps {
    children: React.ReactNode;
    title: string
}

export function TooltipComponent({children, title}: TooltipComponentProps) {
  return (
    <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  )
}
