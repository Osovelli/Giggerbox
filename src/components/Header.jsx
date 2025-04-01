import { Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "./Icons/Logo"
import CustomInput from "./CustomInput"
import CustomButton from "./CustomButton"
import { useState } from "react"

function Header() {
  const [value, setValue] = useState("");
  const navigate = useNavigate()


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/99 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:gap-6 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* <span className="text-xl font-bold tracking-tight">Giggerz™</span> */}
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <CustomInput
              type="search"
              placeholder="Search for anything"
              icon={<Search className="h-4 w-4" />}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        {/* <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
            About Us
          </Link>
          <Link to="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Terms & Conditions
          </Link>
        </nav> */}

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <CustomButton 
            variant="ghost" 
            className="md:inline-flex"
            onClick= {() => navigate("/signin")}
            >
            Login
          </CustomButton>
          <CustomButton
            variant="default"
            onClick= {() => navigate("/signup")}
          >
            Sign Up
          </CustomButton>
        </div>

        {/* Mobile Search Button */}
        {/* <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button> */}
      </div>

      {/* Mobile Search Bar - Only visible when search is active */}
      <div className="md:hidden border-t">
        <div className="px-4 py-3">
            <CustomInput
              type="search"
              placeholder="Search for anything"
              icon={<Search className="h-4 w-4" />}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
        </div>
      </div>
    </header>
  )
}

export default Header

