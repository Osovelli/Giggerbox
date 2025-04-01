/* import React from 'react'
import { Button, buttonVariants } from './ui/button'

export function CustomButton({ 
  children,  
  icon: Icon,
  buttonVariant,
  className = '',
  ...props 
}) {
  return (
    <Button
      variant={buttonVariants.variant[buttonVariant]}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-white transition-colors ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  )
} */

import React from "react";
import { Button } from "@/components/ui/button"; // Import shadcn's Button
import { Loading } from "./Icons/Loading";
  
  const CustomButton = React.forwardRef((props, ref) => {
    const {
      children,
      className = "",
      variant = "default",
      size = "default",
      isLoading = false,
      icon, // Optional icon (e.g., from Lucide)
      ...rest
    } = props;
  
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={`flex items-center gap-2 ${className}`}
        disabled={isLoading}
        {...rest}
      >
        {/* Loading spinner */}
        {isLoading && (
          <Loading />
        )}
  
        {/* Icon (if not loading) */}
        {!isLoading && icon && <span className="">{icon}</span>}
  
        {/* Button text */}
        {children}
      </Button>
    );
  });
  
  CustomButton.displayName = "CustomButton"; // For debugging
  
  export default CustomButton;