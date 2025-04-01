import * as React from "react"
import { RadioGroup } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const CustomRadioGroup = React.forwardRef(({ className, items, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroup ref={ref} className={cn("gap-3", className)} value={value} onValueChange={onValueChange} {...props}>
      {items.map((item) => (
        <div
          key={item.value}
          className={cn(
            "flex items-start space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors",
            value === item.value && "border-primary bg-primary/5",
          )}
          onClick={() => onValueChange(item.value)}
        >
          <input
            type="radio"
            className="mt-1 h-4 w-4 text-primary border-gray-300 focus:ring-primary"
            checked={value === item.value}
            onChange={() => onValueChange(item.value)}
          />
          <div className="space-y-1">
            <p className="font-medium leading-none">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
})

CustomRadioGroup.displayName = "CustomRadioGroup"

export default CustomRadioGroup