import { Link, useLocation } from "react-router-dom"
import { Home, Search, Briefcase, PenTool, User, LogOutIcon, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "../Icons/Logo"
import CustomTooltip from "../CustomTooltip"

function Sidebar({ open, onClose }) {
  const location = useLocation()

  const navigation = [
    {
      name: "Overview",
      icon: Home,
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "Explore",
      icon: Search,
      href: "/dashboard/explore",
      current: location.pathname.includes("/dashboard/explore"),
    },
    {
      name: "My Case",
      icon: Briefcase,
      href: "/dashboard/case",
      current: location.pathname.includes("/dashboard/case"),
    },
    {
      name: "My Creations",
      icon: PenTool,
      href: "/dashboard/creations",
      current: location.pathname.includes("/dashboard/creations"),
    },
    {
      name: "Wallet",
      icon: Wallet,
      href: "/dashboard/wallet",
      current: location.pathname.includes("/dashboard/wallet"),
    },
    {
      name: "Account",
      icon: User,
      href: "/dashboard/account",
      current: location.pathname.includes("/dashboard/account"),
    },
  ]

  return (
    <>
      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform transition-transform duration-200 ease-in-out lg:transform-none",
          !open && "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="text-xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                item.current ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/avatar.jpeg" alt="" className="h-10 w-10 rounded-full" />
              <div className="min-w-0">
                <p className="font-medium truncate">Abayomi Olowu</p>
                <p className="text-sm text-muted-foreground truncate">abayomiolowu@Giggerz.com</p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => {
                /* Add logout handler */
              }}
            >
              <CustomTooltip content={"Sign out"}>
                <LogOutIcon className="h-5 w-5" />
              </CustomTooltip>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

