import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const CustomProgress = React.forwardRef(
  ({ className, value, color = "primary", backgroundColor = "gray-200", ...props }, ref) => {
    // Map color names to Tailwind classes
    const colorMap = {
      primary: "bg-[#ACC734]",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
    }

    const bgColorMap = {
      "gray-200": "bg-gray-200",
      "gray-100": "bg-gray-100",
      "primary-light": "bg-primary/20",
    }

    // Get the appropriate color class or use the provided color directly
    const colorClass = colorMap[color] || color
    const bgColorClass = bgColorMap[backgroundColor] || backgroundColor

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full", bgColorClass, className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all", colorClass)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  },
)
CustomProgress.displayName = "CustomProgress"

export { CustomProgress }