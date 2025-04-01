import { useState } from "react"
import { Menu } from "lucide-react"
import CustomButton from "../CustomButton"
import Sidebar from "./Sidebar"
import Header from "./DashboardHeader"
import { Outlet } from "react-router-dom"

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <CustomButton
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
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

