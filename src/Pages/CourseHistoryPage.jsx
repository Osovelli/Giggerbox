import { useState } from "react"
import { Search, Filter, Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Sample course data
const sampleCourses = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in...",
    thumbnail:
      "/colleagues.png",
    rating: 3.5,
    reviews: 126,
    progress: Math.floor(Math.random() * 100),
    status: index % 2 === 0 ? "ongoing" : "completed",
  }))

function CourseCard({ course }) {
  return (
    <div className="flex gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Thumbnail */}
      <img
        src={course.thumbnail || "/placeholder.svg"}
        alt={course.title}
        className="w-48 h-32 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(course.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < course.rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {course.rating} ({course.reviews})
            </span>
          </div>

          {course.status === "ongoing" ? (
            <div className="space-y-1">
              <Progress value={course.progress}  className="h-4 max-w-sm shadow-sm border" />
              <span className="text-sm text-muted-foreground">{course.progress}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CourseHistoryPage() {
  const [activeTab, setActiveTab] = useState("ongoing")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  // Filter courses based on status and search query
  const filteredCourses = sampleCourses.filter(
    (course) =>
      course.status === activeTab &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCourses = filteredCourses.slice(startIndex, endIndex)

  // Generate page numbers
  const pageNumbers = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages)
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
    }
  }

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Course History</h1>

      {/* Tabs and Search */}
      <div className="flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b">
          {["ongoing", "completed"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-2 px-1 text-sm font-medium capitalize",
                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4 my-8">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {pageNumbers.map((number, index) => (
            <Button
              key={index}
              variant={currentPage === number ? "default" : "outline"}
              className={number === "..." ? "cursor-default" : ""}
              onClick={() => number !== "..." && setCurrentPage(number)}
            >
              {number}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8 / page</SelectItem>
              <SelectItem value="16">16 / page</SelectItem>
              <SelectItem value="24">24 / page</SelectItem>
              <SelectItem value="32">32 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default CourseHistoryPage