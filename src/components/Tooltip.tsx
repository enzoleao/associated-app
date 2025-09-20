import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface TooltipComponentProps {
    children: React.ReactNode;
    title: string
}

export function TooltipComponent({children, title}: TooltipComponentProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>
            {title}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
