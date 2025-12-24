import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import GigPosterItem from "@/components/Case/GigPosterItem"
import CourseItem from "@/components/Case/CourseItem"
import GigApplicationItem from "@/components/Case/GigApplicationItem"
import EmptyState from "@/components/Case/EmptyState"
import FilterDrawer from "@/components/Case/FilterDrawer"
import { useUserRole } from "../hooks/useUserRole"
import useGigStore from "@/store/gigStore"
import useCourseStore from "@/store/courseStore"

// Sample data for gig applications (as a worker)
const gigApplicationsData = [
  {
    id: 1,
    gigId: 101,
    title: "Virtual Assistance for Data Entry and Scheduling Tasks",
    description:
      "Provide virtual assistance for data entry, scheduling, and administrative tasks. Manage calendars, organize meetings, and handle correspondence.",
    price: 120000,
    appliedDate: "2023-04-15",
    status: "pending",
    poster: {
      id: 201,
      name: "John Doe",
      rating: 3.6,
      reviews: 128,
    },
    tags: ["Virtual Assistant", "Data Entry", "Administrative"],
    deadline: "2023-04-22",
    usedPoints: 50,
  },
  {
    id: 2,
    gigId: 102,
    title: "Web Development for E-commerce Platform",
    description:
      "Develop a responsive e-commerce website with product listings, shopping cart, and payment integration. Ensure cross-browser compatibility and mobile responsiveness.",
    price: 350000,
    appliedDate: "2023-04-10",
    status: "accepted",
    poster: {
      id: 202,
      name: "Jane Smith",
      rating: 4.2,
      reviews: 95,
    },
    tags: ["Web Development", "E-commerce", "Frontend"],
    deadline: "2023-05-15",
    usedPoints: 0,
  },
  {
    id: 3,
    gigId: 103,
    title: "Graphic Design for Marketing Materials",
    description:
      "Create visually appealing marketing materials including social media graphics, brochures, and banners. Follow brand guidelines and deliver in multiple formats.",
    price: 85000,
    appliedDate: "2023-04-05",
    status: "rejected",
    poster: {
      id: 203,
      name: "Michael Johnson",
      rating: 4.8,
      reviews: 156,
    },
    tags: ["Graphic Design", "Marketing", "Social Media"],
    deadline: "2023-04-20",
    usedPoints: 25,
  },
  {
    id: 4,
    gigId: 104,
    title: "Content Writing for Blog Articles",
    description:
      "Write engaging and SEO-optimized blog articles on various topics. Research thoroughly and provide well-structured content with proper citations.",
    price: 45000,
    appliedDate: "2023-04-01",
    status: "completed",
    poster: {
      id: 204,
      name: "Sarah Williams",
      rating: 4.5,
      reviews: 112,
    },
    tags: ["Content Writing", "SEO", "Blogging"],
    deadline: "2023-04-10",
    usedPoints: 0,
  },
]

function MyCasePage() {
  // Get user role from custom hook
  const { userRole, setUserRole } = useUserRole()
  const { getMyGigs, myGigs, loading: gigsLoading } = useGigStore()
  const { fetchUserCourses, userCourses, loading: coursesLoading } = useCourseStore()
  const [activeView, setActiveView] = useState("gigs")
  const [activeStatus, setActiveStatus] = useState("ongoing")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: null,
    priceRange: { min: "", max: "" },
    categories: [],
    types: [],
    applicationStatus: [],
  })

  useEffect(() => {
    // Fetch user's gigs when component mounts
    getMyGigs()
  }, [getMyGigs])

  useEffect(() => {
    // Fetch user's courses when component mounts
    fetchUserCourses()
  }, [fetchUserCourses])

  // For demo purposes, allow toggling between roles
  const toggleRole = () => {
    setUserRole(userRole === "poster" ? "worker" : "poster")
  }

  // Transform API gig data to match component structure
  const transformGigData = (apiGigs) => {
    if (!Array.isArray(apiGigs)) return []
    
    return apiGigs.map((gig) => {
      // Calculate days since creation
      const createdDate = new Date(gig.createdAt)
      const today = new Date()
      const daysDiff = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24))
      
      // Map API status to component status
      const getStatusFromApiStatus = (apiStatus) => {
        switch (apiStatus?.toLowerCase()) {
          case 'open':
          case 'active':
            return 'ongoing'
          case 'in-progress':
            return 'ongoing'
          case 'completed':
            return 'completed'
          case 'closed':
          case 'cancelled':
            return 'completed'
          default:
            return 'ongoing'
        }
      }

      return {
        id: gig._id,
        title: gig.title,
        description: gig.description,
        price: gig.budget,
        createdDays: daysDiff,
        status: getStatusFromApiStatus(gig.status),
        tags: gig.requiredSkills || [],
        applicants: gig.applicantsCount || 0,
        deadline: gig.deadline || null,
        location: gig.location || "Remote",
        category: gig.category,
        maxHires: gig.maxHires,
        currency: gig.currency || "NGN",
        images: gig.images || [],
        attachments: gig.attachments || [],
        createdAt: gig.createdAt,
        updatedAt: gig.updatedAt,
        apiStatus: gig.status, // Keep original status for reference
      }
    })
  }

  // Transform API course data to match component structure
  const transformCourseData = (apiCourses) => {
    if (!Array.isArray(apiCourses)) return []
    
    return apiCourses.map((course) => {
      // Calculate course status based on dates or progress
      const getCourseStatus = () => {
        if (course.progress === 100 || course.status === 'completed') {
          return 'completed'
        }
        if (course.status === 'ongoing' || course.progress > 0) {
          return 'ongoing'
        }
        // Check if course has started based on createdAt
        const startDate = new Date(course.enrolledAt || course.createdAt)
        const today = new Date()
        if (startDate <= today) {
          return 'ongoing'
        }
        return 'ongoing'
      }

      return {
        id: course._id,
        title: course.title,
        description: course.description,
        instructor: course.tutor?.email || course.tutor?.name || "Instructor",
        progress: course.progress || 0,
        startDate: course.enrolledAt || course.createdAt,
        endDate: course.endDate || null,
        status: getCourseStatus(),
        type: course.type === "one-on-one" ? "1-on-1" : "Self-paced",
        image: course.videoUrl || course.thumbnail || "/placeholder.svg",
        price: course.price || 0,
        duration: course.duration,
        lessons: course.lessons || [],
        tutorId: course.tutor?._id,
        tutorEmail: course.tutor?.email,
        slug: course.slug,
        availableTimes: course.availableTimes || [],
      }
    })
  }

  // Get the appropriate data based on user role and active view
  const getFilteredData = () => {
    let data

    if (userRole === "poster") {
      if (activeView === "gigs") {
        // Use transformed myGigs data from store
        const transformedGigs = transformGigData(myGigs || [])
        data = transformedGigs
      } else {
        // Use transformed userCourses data from store
        const transformedCourses = transformCourseData(userCourses || [])
        data = transformedCourses
      }
    } else {
      // Worker role
      if (activeView === "gigs") {
        data = gigApplicationsData
      } else {
        // Use transformed userCourses data from store for workers too
        const transformedCourses = transformCourseData(userCourses || [])
        data = transformedCourses
      }
    }

    return data.filter((item) => {
      // Filter by status
      if (userRole === "worker" && activeView === "gigs") {
        // For workers, filter gig applications by status
        if (activeStatus === "ongoing" && !["pending", "accepted"].includes(item.status)) return false
        if (activeStatus === "completed" && !["completed", "rejected"].includes(item.status)) return false
      } else {
        // For posters or courses
        if (item.status !== activeStatus) return false
      }

      // Filter by search query
      if (
        searchQuery &&
        !item.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by application status (for workers)
      if (userRole === "worker" && activeView === "gigs" && filters.applicationStatus.length > 0) {
        if (!filters.applicationStatus.includes(item.status)) return false
      }

      // Filter by date range
      if (filters.dateRange) {
        const today = new Date()
        const itemDate = new Date(
          item.appliedDate || 
          item.enrolledAt || 
          item.startDate || 
          item.createdAt || 
          new Date(today.setDate(today.getDate() - (item.createdDays || 0)))
        )
        const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24))

        if (filters.dateRange === "last7days" && daysDiff > 7) return false
        if (filters.dateRange === "last30days" && daysDiff > 30) return false
        if (filters.dateRange === "last90days" && daysDiff > 90) return false
      }

      // Filter by price range
      if ((filters.priceRange.min || filters.priceRange.max) && item.price !== undefined) {
        if (filters.priceRange.min && item.price < Number.parseInt(filters.priceRange.min)) return false
        if (filters.priceRange.max && item.price > Number.parseInt(filters.priceRange.max)) return false
      }

      // Filter by categories/tags
      if (filters.categories.length > 0 && item.tags) {
        if (!item.tags.some((tag) => filters.categories.includes(tag))) return false
      }

      // Filter by course type
      if (activeView === "courses" && filters.types.length > 0 && item.type) {
        if (!filters.types.includes(item.type)) return false
      }

      return true
    })
  }

  const filteredData = getFilteredData()

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeView, activeStatus, searchQuery, filters, userRole])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
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
    return pageNumbers
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      dateRange: null,
      priceRange: { min: "", max: "" },
      categories: [],
      types: [],
      applicationStatus: [],
    })
    setSearchQuery("")
  }

  // Get the appropriate title based on user role and active view
  const getPageTitle = () => {
    if (userRole === "poster") {
      return "My Case"
    } else {
      return activeView === "gigs" ? "My Applications" : "My Courses"
    }
  }

  // Get the appropriate description based on user role and active view
  const getPageDescription = () => {
    if (userRole === "poster") {
      return "Track and manage all your ongoing gigs and courses in one place."
    } else {
      return activeView === "gigs"
        ? "Track and manage all your gig applications in one place."
        : "Track and manage all your enrolled courses in one place."
    }
  }

  // Check if currently loading
  const isLoading = (activeView === "gigs" ? gigsLoading : coursesLoading)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* For demo purposes only - toggle between roles */}
      <div className="mb-4 flex justify-end">
        <Button onClick={toggleRole} variant="outline" size="sm">
          Toggle Role: {userRole === "poster" ? "Gig Poster" : "Gig Worker"}
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <p className="text-muted-foreground">{getPageDescription()}</p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex space-x-2">
          <Button
            variant={activeView === "gigs" ? "default" : "outline"}
            className={`rounded-full ${activeView === "gigs" ? "bg-black text-white" : ""}`}
            onClick={() => setActiveView("gigs")}
          >
            {userRole === "poster" ? "Gigs" : "Applications"}
          </Button>
          <Button
            variant={activeView === "courses" ? "default" : "outline"}
            className={`rounded-full ${activeView === "courses" ? "bg-black text-white" : ""}`}
            onClick={() => setActiveView("courses")}
          >
            Courses
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {(searchQuery ||
            filters.dateRange ||
            filters.priceRange.min ||
            filters.priceRange.max ||
            filters.categories.length > 0 ||
            filters.types.length > 0 ||
            filters.applicationStatus.length > 0) && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
          {userRole === "poster" && activeView === "gigs" && (
            <Button onClick={() => (window.location.href = "/dashboard/post-gig")} className="bg-black hover:bg-black/90">
              Post a Gig
            </Button>
          )}
        </div>
      </div>

      {/* Status Tabs and Content */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Tabs defaultValue={activeStatus} onValueChange={setActiveStatus} className="w-full">
          <TabsList className="grid max-w-sm grid-cols-2">
            <TabsTrigger value="ongoing">
              {userRole === "worker" && activeView === "gigs" ? "Active" : "Ongoing"}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {userRole === "worker" && activeView === "gigs" ? "History" : "Completed"}
            </TabsTrigger>
          </TabsList>
          
          {/* Content */}
          <div className="space-y-6 mt-6">
            <TabsContent value={activeStatus} className="mt-0">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : paginatedData.length > 0 ? (
                <div className="space-y-6">
                  {paginatedData.map((item) => {
                    if (activeView === "courses") {
                      return <CourseItem key={item.id} course={item} />
                    } else if (userRole === "poster") {
                      return <GigPosterItem key={item.id} gig={item} />
                    } else {
                      return <GigApplicationItem key={item.id} application={item} />
                    }
                  })}
                </div>
              ) : (
                <EmptyState
                  type={activeView === "gigs" ? (userRole === "poster" ? "gigs" : "applications") : "courses"}
                  status={activeStatus}
                  userRole={userRole}
                  hasFilters={
                    searchQuery ||
                    filters.dateRange ||
                    filters.priceRange.min ||
                    filters.priceRange.max ||
                    filters.categories.length > 0 ||
                    filters.types.length > 0 ||
                    filters.applicationStatus.length > 0
                  }
                  onClear={clearFilters}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  className={currentPage === page ? "bg-primary" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={`${itemsPerPage} / page`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 / page</SelectItem>
                <SelectItem value="8">8 / page</SelectItem>
                <SelectItem value="12">12 / page</SelectItem>
                <SelectItem value="16">16 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleApplyFilters}
        activeView={activeView}
        userRole={userRole}
      />
    </div>
  )
}

export default MyCasePage