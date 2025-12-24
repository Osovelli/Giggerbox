import { useEffect, useState } from "react"
import { Search, Filter, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomButton from "@/components/CustomButton"
import FilterSheet from "@/components/FilterSheet"
import { useNavigate } from "react-router-dom"
import useCourseStore from "@/store/courseStore"

// Sample course data
/* const courses = Array(50)
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
  })) */

const ITEMS_PER_PAGE = 10

function CourseCard({ course }) {
  const navigate = useNavigate()

  return (
    <div 
    className="flex flex-col md:flex-row bg-white shadow-sm flex-wrap gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors"
    onClick={() => navigate(`/dashboard/course/${course._id}`)}
    >
      {/* Thumbnail */}
      <img
        src={course.videoUrl || course.thumbnail || "/colleagues.png"}
        alt={course.title}
        className="h-32 sm:w-48 w-full object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-primary leading-3 font-medium">₦ {course?.price?.toLocaleString()}</div>
          <div className="text-sm leading-3 text-muted-foreground capitalize">{course.type?.replace('-', ' ')}</div>
          <div className="text-sm leading-3 text-muted-foreground">{course.duration} weeks</div>
          <div className="text-sm leading-3 text-muted-foreground">{course.lessons?.length || 0} lessons</div>
        </div>
        {/* <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < rating
                      ? "text-yellow-400 fill-yellow-400 opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        </div> */}
      </div>
    </div>
  )
}

function OverviewPage() {
  const { fetchAllCourses, courses, loading } = useCourseStore()
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


  useEffect(() => {
    fetchAllCourses()
  }, [fetchAllCourses])

  console.log("All courses fetched:", courses)

  const navigate = useNavigate()

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters)
    setCurrentPage(1) // Reset to first page when filters change
    // You can update the filteredCourses based on the active filters
  }

  // Convert courses object to array if needed
  const coursesArray = Array.isArray(courses) ? courses : Object.values(courses || {})


  // Filter courses based on search query
  /* const filteredCourses = courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  ) */

  // Filter courses based on search query and active filters
  const filteredCourses = coursesArray.filter((course) => {
    // Search filter
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())

    // Price range filter
    const matchesPrice =
      (!activeFilters.priceRange.min || course.price >= Number(activeFilters.priceRange.min)) &&
      (!activeFilters.priceRange.max || course.price <= Number(activeFilters.priceRange.max))

    // Course type filter
    const matchesType =
      !activeFilters.courseType || course.type === activeFilters.courseType

    // Rating filter
    const matchesRating =
      !activeFilters.rating || (course.rating || 0) >= activeFilters.rating

    return matchesSearch && matchesPrice && matchesType && matchesRating
  })


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
            placeholder="Search courses..."
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && coursesArray.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses available.</p>
        </div>
      )}

      {/* No Results State */}
      {!loading && coursesArray.length > 0 && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses match your search criteria.</p>
        </div>
      )}

      {/* Course List */}
      {!loading && currentCourses.length > 0 && (
        <>
          <div className="space-y-4 mb-8">
            {currentCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
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
                  disabled={number === "..."}
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
        </>
      )}

      {/* Filter Sheet */}
      <FilterSheet 
      isOpen={isFilterOpen} 
      onClose={() => setIsFilterOpen(false)} 
      onApplyFilters={handleApplyFilters} 
      />
    </div>
  )
}

export default OverviewPage