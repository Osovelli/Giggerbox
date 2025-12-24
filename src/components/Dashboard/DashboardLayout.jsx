import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import CustomButton from "../CustomButton"
import Sidebar from "./Sidebar"
import Header from "./DashboardHeader"
import { Outlet } from "react-router-dom"
import useUserStore from "@/store/userStore"

function DashboardLayout({ children }) {
  const { userOnboarding, loading, user, error } = useUserStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Fetch user onboarding status on mount
    userOnboarding().catch((err) => {
      console.error("Failed to fetch user onboarding status:", err)
    })
  }, [userOnboarding])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <CustomButton
        variant="ghost"
        size="icon"
        className="fixed top-4 left-0 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </CustomButton>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-72">
        <Header />
        <main className="p-6">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

