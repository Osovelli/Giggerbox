/* const CustomInput = React.forwardRef((props, ref) => {
  const { label, error, icon, ...rest } = props;

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <Input
          ref={ref}
          {...rest}
          className={`${rest.className} ${error ? "border-red-500" : ""} ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput; */


import React from "react"
import { Input } from "@/components/ui/input"

const CustomInput = React.forwardRef(({ label, error, optional, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">{label}</label>
          {optional && <span className="text-sm text-muted-foreground">(optional)</span>}
        </div>
      )}
      <Input ref={ref} {...props} className={`${props.className || ""} ${error ? "border-red-500" : ""}`} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
})

CustomInput.displayName = "CustomInput"

export default CustomInput

