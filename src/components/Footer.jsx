import { Link } from "react-router-dom"
import { Logo } from "./Icons/Logo"

function Footer() {
  return (
    <footer className="shadow-md border-t py-4">
      <div className="mx-auto px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight">
            <Logo />
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Giggerz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

