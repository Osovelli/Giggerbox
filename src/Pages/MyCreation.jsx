import { useState, useMemo } from "react"
import { Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/Dashboard/DashboardLayout"
import Table from "@/components/CustomTable"
import { useNavigate } from "react-router-dom"

// Sample gigs data
const sampleGigs = [
  {
    id: 1,
    name: "Design Company Profile",
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups.",
    status: "Ongoing",
    date: "22-01-2024",
  },
  ...Array(6).fill(null).map((_, index) => ({
    id: index + 2,
    name: "Design Company Profile", // Change this to your gig name
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups.",
    status: "Completed",
    date: "22-01-2024",
  })),  // Add more sample gigs as needed
]
// Sample courses data
const sampleCourses = [
  {
    id: 1,
    thumbnail: "/course-thumbnail.png",
    name: "Google Data Analytics Course",
    dateCreated: "22-01-2024",
    status: "Ongoing",
    type: "1-on-1 class with",
    studentName: "[Student Name]",
  },
  {
    id: 2,
    thumbnail: "/course-thumbnail.png",
    name: "Google Data Analytics Course",
    dateCreated: "22-01-2024",
    status: "Ongoing",
    type: "Self Paced",
    studentName: "N/A",
  },
  ...Array(6).fill(null).map((_, index) => ({
    id: index + 3,  // Change this to your course id
    thumbnail: "/course-thumbnail.png",
    name: "Google Data Analytics Course",  // Change this to your course name
    dateCreated: "22-01-2024",
    status: "Completed",
    type: "1-on-1 class with",
    studentName: "[Student Name]",
  })),
  // Add more sample courses as needed
]

// Column definitions
const gigColumns = [
  { key: "name", label: "Gig Name" },
  { key: "description", label: "Gig Description" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
]

const courseColumns = [
  { key: "name", label: "Course Name" },
  { key: "dateCreated", label: "Date created" },
  { key: "status", label: "Status" },
  { key: "type", label: "Type" },
  { key: "studentName", label: "Student Name" },
]

const renderCustomCell = (key, value, row) => {
  if (key === "description") {
    return (
      <div className="max-w-[500px] text-wrap">
        <p className="line-clamp-2">{value}</p>
      </div>
    )
  }

  if (key === "name" && row.thumbnail) {
    return (
      <div className="flex items-center gap-3">
        <img src={row.thumbnail || "/placeholder.svg"} alt="" className="w-12 h-12 rounded object-cover" />
        <span>{value}</span>
      </div>
    )
  }

  if (key === "status") {
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value.toLowerCase() === "ongoing" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
        }`}
      >
        {value}
      </span>
    )
  }

  if (key === "type" && row.studentName) {
    return (
      <div className="flex items-center gap-1">
        <span>{value}</span>
        <span className="text-primary">{row.studentName}</span>
      </div>
    )
  }

  return value
}

function MyCreations() {
  const [activeView, setActiveView] = useState("gigs")
  const [activeTab, setActiveTab] = useState("ongoing")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const navigate = useNavigate()

  const filteredData = useMemo(() => {
    const dataToFilter = activeView === "gigs" ? sampleGigs : sampleCourses

    return dataToFilter.filter(
      (item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeTab === "ongoing" ? item.status.toLowerCase() === "ongoing" : item.status.toLowerCase() === "completed"),
    )
  }, [activeView, activeTab, searchTerm])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleRowClick = (item) => {
    if (activeView === "gigs") {
      navigate(`/gigs/${item.id}`)
    } else {
      navigate(`/courses/${item.id}`)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My Creations</h1>
            <div className="flex gap-2 items-center">
              <Button
                className={`rounded-full ${
                  activeView === "gigs" ? "bg-black text-white" : "bg-transparent text-black border-2"
                }`}
                onClick={() => setActiveView("gigs")}
              >
                Gigs
              </Button>
              <Button
                className={`rounded-full ${
                  activeView === "courses" ? "bg-black text-white" : "bg-transparent text-black border-2"
                }`}
                onClick={() => setActiveView("courses")}
              >
                Courses
              </Button>
              <Button
                className="bg-[#7C3AED] hover:bg-[#7C3AED]/90"
                onClick={() => navigate(activeView === "gigs" ? "/dashboard/create-gig" : "/dashboard/create-course")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create {activeView === "gigs" ? "Gig" : "Course"}
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Discover a world of opportunities to post gigs, create courses, and grow your skills.
          </p>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            {/* Tabs */}
            <div className="flex gap-4 border-b">
              <button
                className={`pb-2 px-1 text-sm font-medium ${
                  activeTab === "ongoing" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </button>
              {activeView === "courses" && (
                <button
                  className={`pb-2 px-1 text-sm font-medium ${
                    activeTab === "upcoming" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
              )}
              <button
                className={`pb-2 px-1 text-sm font-medium ${
                  activeTab === "completed" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <Table
            data={sortedData}
            columns={activeView === "gigs" ? gigColumns : courseColumns}
            onRowClick={handleRowClick}
            renderCustomCell={renderCustomCell}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </div>
    </>
  )
}

export default MyCreations

