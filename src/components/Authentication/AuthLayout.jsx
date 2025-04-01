import { Link } from "react-router-dom"
import { Logo } from "../Icons/Logo"

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Auth Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                <Logo />
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/signin" className="text-sm font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Content */}
      <main className="mx-auto px-4 py-8">
        <div className="mx-auto max-w-[600px]">{children}</div>
      </main>
    </div>
  )
}

export default AuthLayout





