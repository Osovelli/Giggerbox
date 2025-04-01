import { useState } from "react"
import { Search, Filter, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomButton from "@/components/CustomButton"
import FilterSheet from "@/components/FilterSheet"
import { useNavigate } from "react-router-dom"

// Sample course data
const courses = Array(50)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in...",
    price: 20000,
    learners: "2k",
    type: "Self paced course",
    duration: "20 hrs",
    rating: 3.5,
    reviews: 126,
    thumbnail:
      "/colleagues.png",
  }))

const ITEMS_PER_PAGE = 10

function CourseCard({ course }) {
  const navigate = useNavigate()

  return (
    <div 
    className="flex gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors"
    onClick={() => navigate(`/dashboard/course/${course.id}`)}
    >
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

        <div className="flex items-center gap-6">
          <div className="text-primary font-medium">₦ {course.price.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">{course.learners} learners</div>
          <div className="text-sm text-muted-foreground">{course.type}</div>
          <div className="text-sm text-muted-foreground">{course.duration}</div>
        </div>

        <div className="flex items-center gap-1 mt-2">
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
          <span className="text-sm text-muted-foreground">({course.reviews})</span>
        </div>
      </div>
    </div>
  )
}

function OverviewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    priceRange: { min: "", max: "" },
    rating: 0,
    courseType: "",
    categories: [],
    startDate: "anytime",
  })

  const navigate = useNavigate()
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters)
    // Apply filtering logic here
    // You can update the filteredCourses based on the active filters
  }

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Courses</h1>
        <CustomButton 
        variant="outline"
        onClick={() => navigate("/dashboard/course-history")}
        >
            Course History
        </CustomButton>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
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
        <CustomButton 
        variant="outline" 
        size="icon"
        onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </CustomButton>
      </div>

      {/* Course List */}
      <div className="space-y-4 mb-8">
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
          <CustomButton
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </CustomButton>

          {pageNumbers.map((number, index) => (
            <CustomButton
              key={index}
              variant={currentPage === number ? "default" : "outline"}
              className={number === "..." ? "cursor-default" : ""}
              onClick={() => number !== "..." && setCurrentPage(number)}
            >
              {number}
            </CustomButton>
          ))}

          <CustomButton
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </CustomButton>

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
              <SelectItem value="5">5 / page</SelectItem>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="20">20 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <FilterSheet 
      isOpen={isFilterOpen} 
      onClose={() => setIsFilterOpen(false)} 
      onApplyFilters={handleApplyFilters} 
      />
    </div>
  )
}

export default OverviewPage