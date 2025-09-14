import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  label?: string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

function Input({ className, type, prefixIcon, suffixIcon, label, id, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type
  const inputId = id || React.useId() 

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative w-full h-[46px] rounded-md border text-base md:text-sm transition",
          "border-gray-300",
          "focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {prefixIcon && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
            {prefixIcon}
          </span>
        )}

        <input
          id={inputId}
          type={inputType}
          className={cn(
            "w-full h-full outline-none bg-transparent px-2 placeholder:text-gray-400 selection:bg-blue-600 selection:text-white",
            prefixIcon && "pl-10",
            (isPassword || suffixIcon) && "pr-8"
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : (
          suffixIcon && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              {suffixIcon}
            </span>
          )
        )}
      </div>
    </div>
  )
}

export { Input }
