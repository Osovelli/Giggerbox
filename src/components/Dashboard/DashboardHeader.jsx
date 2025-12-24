import { Bell, LogOut, MessageSquare, MessagesSquareIcon, Settings, Share2, User, Wallet } from "lucide-react"
import CustomButton from "../CustomButton"
import CustomInput from "../CustomInput"
import { CustomDropdown } from "@/components/CustomDropdown"
import { useState } from "react"
import ProfileSheet from "../PeofileSheet"
import NotificationSheet from "../NotificationSheet"
import MessagesSheet from "../MessageSheet"
import { useNavigate } from "react-router-dom"

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      type: "gig",
      message: "Your application for [Gig Title] has been accepted.",
      timePeriod: "Today",
      unread: true,
    },
    {
      id: 2,
      type: "gig",
      message: "[Gig Title] you applied for has been filled/closed.",
      timePeriod: "Today",
      unread: true,
    },
    {
      id: 3,
      type: "gig",
      message: "You have a new applicant for your gig [Gig Title].",
      timePeriod: "Today",
      unread: true,
    },
    {
      id: 4,
      type: "gig",
      message: "Your bid for [Gig Title] has placed you at the top of the list.",
      timePeriod: "Today",
      unread: true,
    },
    {
      id: 5,
      type: "gig",
      message: "Your hired gigger has submitted work for [Gig Title]. Review the submission now",
      timePeriod: "This Week",
      unread: false,
    },
    {
      id: 6,
      type: "gig",
      message: "Your Gig [Gig Title] has been marked as completed. for [Gig Title] has been accepted.",
      timePeriod: "This Week",
      unread: false,
    },
    {
      id: 7,
      type: "gig",
      message: "Your Gig [Gig Title] has been marked as completed. for [Gig Title] has been accepted.",
      timePeriod: "This Week",
      unread: false,
    },
    {
      id: 8,
      type: "message",
      message: "You have a new message from [User Name].",
      timePeriod: "Last week",
      unread: false,
    },
  ] 
  
  // Sample messages data
const sampleMessages = [
  {
    id: 1,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: true,
  },
  {
    id: 2,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: true,
  },
  {
    id: 3,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
  {
    id: 4,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
  {
    id: 5,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
  {
    id: 6,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
  {
    id: 7,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
  {
    id: 8,
    userName: "User name",
    avatar: "/avatar.jpeg",
    preview: "I hope this message finds you well! I came across your profile and wanted to reach out...",
    timestamp: "10:10 PM",
    unread: false,
  },
]

function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [messages, setMessages] = useState(sampleMessages)

  const navigate = useNavigate()

  const unreadCount = notifications.filter((n) => n.unread).length

  const unreadMessages = messages.filter((m) => m.unread).length

  const userMenuItems = [
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      separator: true,
    },
    {
      label: "Log out",
      href: "/logout",
      icon: LogOut,
      className: "text-red-600",
      separator: true,
    },
  ]


  const UserButton = (
    <CustomButton variant="ghost" className="flex items-center border shadow-sm gap-2 px-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
      <img src="/avatar.jpeg" alt="" className="h-8 w-8 rounded-full" />
      <span>Abayomi</span>
    </CustomButton>
  )

  return (
    <>
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
      <div className="px-6 h-16 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-xl ml-14 lg:ml-0 hidden md:block">
          <CustomInput 
          type="search" 
          placeholder="Search" 
          className="w-full shadow-inner" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-24 md:ml-0">
          <CustomButton 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => {
            navigate("/dashboard/wallet")
          }}
          >
            <Wallet className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </CustomButton>
          <CustomButton variant="ghost" size="icon" className="relative" onClick={() => setIsMessagesOpen(true)}>
            <MessagesSquareIcon className="h-5 w-5" />
            {unreadMessages > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />}
          </CustomButton>
          <CustomButton variant="ghost" size="icon" className="relative" onClick={() => setIsNotificationOpen(true)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />}
          </CustomButton>

          {/* User Menu */}
          {/* <CustomDropdown  buttonText={UserButton} menuItems={userMenuItems} onClick={() => setIsProfileOpen(true)} /> */}
          <CustomButton 
          variant="ghost" 
          className="flex items-center border shadow-sm gap-2 px-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
          onClick={() => setIsProfileOpen(true)}
          >
            <img src="/avatar.jpeg" alt="" className="h-8 w-8 rounded-full" />
            <span>Abayomi</span>
        </CustomButton>
        </div>
      </div>
    </header>
    <ProfileSheet 
    isOpen={isProfileOpen} 
    onClose={() => setIsProfileOpen(false)} 
    />
    <NotificationSheet
      isOpen={isNotificationOpen}
      onClose={() => setIsNotificationOpen(false)}
      notifications={notifications}
    />
    <MessagesSheet
      isOpen={isMessagesOpen}
      onClose={() => setIsMessagesOpen(false)}
      messages={messages}
    />
  </>
  )
}

export default DashboardHeader

