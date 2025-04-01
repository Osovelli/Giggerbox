import { useState, useEffect } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Bell, FileText, HelpCircle, LogOut, Search, Settings, Share2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Account navigation items
const accountItems = [
  { icon: User, label: "Edit Profile", href: "/dashboard/account" },
  { icon: FileText, label: "Work Samples", href: "/dashboard/account/work-samples" },
  { icon: Bell, label: "Notification", href: "/dashboard/account/notification" },
  { icon: Settings, label: "Change Password", href: "/dashboard/account/change-password" },
  { icon: HelpCircle, label: "Help Center", href: "/dashboard/account/help-center" },
  { icon: FileText, label: "Terms & Conditions", href: "/dashboard/account/terms" },
  { icon: FileText, label: "Privacy Policy", href: "/dashboard/account/privacy" },
  /* { icon: LogOut, label: "Logout", href: "#logout" } */,
]

function AccountLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("Edit Profile")

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname
    const currentItem = accountItems.find(
      (item) => item.href === path || (path === "/account" && item.href === "/account"),
    )

    if (currentItem) {
      setActiveSection(currentItem.label)
    }
  }, [location])

  const handleLogout = () => {
    // Add logout logic here
    navigate("/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              {/* Profile Summary */}
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold">Abayomi Olowu</h2>
                <p className="text-sm text-muted-foreground">abayomiolowu@Giggerz.com</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-b pb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Review</div>
                  <div className="font-medium">4.5/5.0</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Jobs count</div>
                  <div className="font-medium">46</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Joined</div>
                  <div className="font-medium">2022</div>
                </div>
              </div>

              {/* Account Navigation */}
              <nav className="space-y-1">
                {accountItems.map((item) =>
                  item.href === "#logout" ? (
                    <button
                      key={item.label}
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-colors",
                        activeSection === item.label ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              {/* Earn Rewards */}
              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Earn rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Invite friends and earn points for every successful referral. Start sharing today!
                </p>
                <Button className="w-full" variant="default">
                  <Share2 className="h-4 w-4 mr-2" />
                  Start Earning
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Content Area */}
          <div className="md:col-span-3 bg-white rounded-lg border p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout