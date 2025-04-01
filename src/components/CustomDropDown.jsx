import { Button } from "@/components/ui/button"
import React from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* 
export function CustomDropdown({ buttonText, menuItems }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {buttonText} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && item.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem asChild>
              <Link to={item.href} className={`flex items-center ${item.className || ""}`}>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} */

  
  export function CustomDropdown({ buttonText, menuItems }) {
    const isCustomButton = React.isValidElement(buttonText)
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isCustomButton ? (
            React.cloneElement(buttonText, {
              children: (
                <>
                  {buttonText.props.children}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              ),
            })
          ) : (
            <Button variant="outline">
              {buttonText} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 ml-6">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && item.separator && <DropdownMenuSeparator />}
              <DropdownMenuItem asChild>
                <Link to={item.href} className={`flex items-center ${item.className || ""}`}>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }  