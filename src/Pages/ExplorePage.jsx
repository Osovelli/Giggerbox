import { useState } from "react"
import { Search, ChevronDown, ChevronRight, Star, Play, Trophy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/Dashboard/DashboardLayout"
import { CustomProgress } from "@/components/CustomProgress"

// Sample data for gigs
const gigsData = [
  {
    id: 1,
    title: "Design Company Profile",
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups...",
    price: 120000,
    createdDays: 2,
    tags: ["UX Design", "Graphics Design", "Product Design"],
  },
  {
    id: 2,
    title: "Design Company Profile",
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups...",
    price: 120000,
    createdDays: 2,
    tags: ["UX Design", "Graphics Design", "Product Design"],
  },
  {
    id: 3,
    title: "Design Company Profile",
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups...",
    price: 120000,
    createdDays: 2,
    tags: ["UX Design", "Graphics Design", "Product Design"],
  },
  {
    id: 4,
    title: "Design Company Profile",
    description:
      "Creating user-centered designs by understanding business requirements, and user feedback. Creating user flows, wireframes, prototypes and mockups...",
    price: 120000,
    createdDays: 2,
    tags: ["UX Design", "Graphics Design", "Product Design"],
  },
]

// Sample data for rewards
const rewardsData = [
  {
    id: 1,
    title: "Watch a video for 15 minutes",
    points: 50,
    icon: <Play className="h-5 w-5 text-white" />,
  },
  {
    id: 2,
    title: "A game task",
    points: 50,
    icon: <Trophy className="h-5 w-5 text-white" />,
  },
  {
    id: 3,
    title: "A download task",
    points: 50,
    icon: <Download className="h-5 w-5 text-white" />,
  },
]

// Sample data for courses
const coursesData = [
  {
    id: 1,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncu...",
    rating: 3.5,
    reviews: 128,
    progress: 80,
    image: "/colleagues.png",
  },
  {
    id: 2,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncu...",
    rating: 3.5,
    reviews: 128,
    progress: 80,
    image: "/colleagues.png",
  },
  {
    id: 3,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncu...",
    rating: 3.5,
    reviews: 128,
    progress: 80,
    image: "/colleagues.png",
  },
  {
    id: 4,
    title: "Google Data Analytics Course",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncu...",
    rating: 3.5,
    reviews: 128,
    progress: 80,
    image: "/colleagues.png",
  },
]

// Categories for filtering
const categories = [
  { id: "analyst", label: "Analyst", count: 39 },
  { id: "backend", label: "Backend Developer", count: 39 },
  { id: "business", label: "Business Development", count: 39 },
  { id: "customer", label: "Customer Service", count: 39 },
]

// Time filters
const timeFilters = [
  { id: "24hours", label: "last 24 hours" },
  { id: "3days", label: "3 days ago" },
  { id: "1week", label: "1 week" },
  { id: "1month", label: "1 Month" },
]

// Start date options
const startDateOptions = [
  { id: "anytime", label: "Anytime" },
  { id: "24hours", label: "Starting in 24 hours" },
  { id: "1week", label: "Starting in a Week" },
  { id: "1month", label: "Starting in 1 Month" },
  { id: "3month", label: "Starting in 3 Month" },
]

function ExplorePage() {
  const [activeTab, setActiveTab] = useState("gigs")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState(["backend"])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedTimeFilter, setSelectedTimeFilter] = useState([])
  const [courseType, setCourseType] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedStartDate, setSelectedStartDate] = useState("anytime")
  const [isFilterExpanded, setIsFilterExpanded] = useState({
    category: true,
    price: true,
    time: true,
    courseType: true,
    rating: true,
    startDate: true,
  })

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Handle time filter selection
  const handleTimeFilterChange = (filterId) => {
    setSelectedTimeFilter((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  // Handle price range change
  const handlePriceChange = (field, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle course type selection
  const handleCourseTypeChange = (type) => {
    setCourseType(type)
  }

  // Handle rating selection
  const handleRatingChange = (rating) => {
    setSelectedRating(rating)
  }

  // Handle start date selection
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date)
  }

  // Toggle filter sections
  const toggleFilterSection = (section) => {
    setIsFilterExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([])
    setPriceRange({ min: "", max: "" })
    setSelectedTimeFilter([])
    setCourseType("")
    setSelectedRating(0)
    setSelectedStartDate("anytime")
  }

  // Apply filters
  const applyFilters = () => {
    // In a real app, this would trigger a data fetch with the selected filters
    console.log("Applying filters:", {
      categories: selectedCategories,
      priceRange,
      timeFilter: selectedTimeFilter,
      courseType,
      rating: selectedRating,
      startDate: selectedStartDate,
    })
  }

  return (
    <>
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs and Search */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-gray-100 p-1 rounded-md">
                  <TabsTrigger
                    value="gigs"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Gigs
                  </TabsTrigger>
                  <TabsTrigger
                    value="courses"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Courses
                  </TabsTrigger>
                  <TabsTrigger
                    value="rewards"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Rewards
                  </TabsTrigger>
                </TabsList>
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Content based on active tab */}
                <TabsContent value="gigs" className="mt-0">
                <div className="space-y-6">
                    {gigsData.map((gig) => (
                    <div key={gig.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="mb-2 text-sm text-gray-500">Created {gig.createdDays} days ago</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary">{gig.title}</h3>
                        <p className="text-gray-600 mb-4">{gig.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            NGN {gig.price.toLocaleString()}
                        </div>
                        {gig.tags.map((tag, index) => (
                            <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                            </div>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
                </TabsContent>

                <TabsContent value="courses" className="mt-0">
                <div className="space-y-6">
                    {coursesData.map((course) => (
                    <div key={course.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                        <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-2">{course.description}</p>
                            <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm">
                                {course.rating} ({course.reviews})
                                </span>
                            </div>
                            </div>
                            <div className="max-w-md bg-gray-200 rounded-full h-2">
                            {/* <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div> */}
                            <CustomProgress value={course.progress} color="primary" className="h-2" />
                            </div>
                            <div className="text-xs text-gray-500">{course.progress}%</div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </TabsContent>

                <TabsContent value="rewards" className="mt-0">
                <div className="space-y-4">
                    {rewardsData.map((reward) => (
                    <div
                        key={reward.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center">
                            {reward.icon}
                        </div>
                        <div>
                            <h3 className="font-medium">{reward.title}</h3>
                            <div className="flex items-center">
                            <div className="h-4 w-4 bg-yellow-400 rounded-full mr-1"></div>
                            <span className="text-sm text-gray-600">+{reward.points}</span>
                            </div>
                        </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    ))}
                </div>
                </TabsContent>
              </Tabs>
            </div>


            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-500">Page {currentPage} of 16</div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 border rounded hover:bg-gray-50"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded ${currentPage === page ? "bg-primary text-white" : "border hover:bg-gray-50"}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <span>...</span>
                <button className="w-8 h-8 border rounded hover:bg-gray-50" onClick={() => setCurrentPage(16)}>
                  16
                </button>
                <button
                  className="p-2 border rounded hover:bg-gray-50"
                  onClick={() => setCurrentPage(Math.min(16, currentPage + 1))}
                  disabled={currentPage === 16}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Select value={`${8}`} onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="8 / page" />
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

          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Filter</h2>

              {/* Gig Category / Skills Filter */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleFilterSection(activeTab === "courses" ? "skills" : "category")}
                >
                  <h3 className="font-medium">{activeTab === "courses" ? "Skills" : "Gig Category"}</h3>
                  {isFilterExpanded[activeTab === "courses" ? "skills" : "category"] ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </div>

                {isFilterExpanded[activeTab === "courses" ? "skills" : "category"] && (
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <label htmlFor={category.id} className="text-sm flex items-center justify-between w-full">
                          <span>{category.label}</span>
                          <span className="text-muted-foreground">({category.count})</span>
                        </label>
                      </div>
                    ))}
                    <button className="text-primary text-sm hover:underline">See all</button>
                  </div>
                )}
              </div>

              {/* Course Type Filter - Only show for Courses tab */}
              {activeTab === "courses" && (
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("courseType")}
                  >
                    <h3 className="font-medium">Course Type</h3>
                    {isFilterExpanded.courseType ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>

                  {isFilterExpanded.courseType && (
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 text-center cursor-pointer ${courseType === "1-on-1" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
                        onClick={() => handleCourseTypeChange("1-on-1")}
                      >
                        <div className="text-sm font-medium">1-On-1</div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 text-center cursor-pointer ${courseType === "self-paced" ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
                        onClick={() => handleCourseTypeChange("self-paced")}
                      >
                        <div className="text-sm font-medium">Self Paced</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price Filter */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleFilterSection("price")}
                >
                  <h3 className="font-medium">Price</h3>
                  {isFilterExpanded.price ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </div>

                {isFilterExpanded.price && (
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full"
                    />
                    <span>-</span>
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Time Posted / Rating / Start Date Filter */}
              {activeTab === "gigs" && (
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("time")}
                  >
                    <h3 className="font-medium">Time Posted</h3>
                    {isFilterExpanded.time ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </div>

                  {isFilterExpanded.time && (
                    <div className="space-y-3">
                      {timeFilters.map((filter) => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={filter.id}
                            checked={selectedTimeFilter.includes(filter.id)}
                            onCheckedChange={() => handleTimeFilterChange(filter.id)}
                          />
                          <label htmlFor={filter.id} className="text-sm">
                            {filter.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Rating Filter - Only show for Courses tab */}
              {activeTab === "courses" && (
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("rating")}
                  >
                    <h3 className="font-medium">Rating</h3>
                    {isFilterExpanded.rating ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>

                  {isFilterExpanded.rating && (
                    <div className="flex justify-between">
                      {[0, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRatingChange(rating)}
                          className="flex flex-col items-center gap-1"
                        >
                          <Star
                            className={`h-6 w-6 ${selectedRating === rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                          <span className="text-xs text-gray-500">{rating === 0 ? "Any" : `${rating} Star`}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Start Date Filter - Only show for Courses tab */}
              {activeTab === "courses" && (
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("startDate")}
                  >
                    <h3 className="font-medium">Start date</h3>
                    {isFilterExpanded.startDate ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>

                  {isFilterExpanded.startDate && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {startDateOptions.slice(0, 2).map((option) => (
                          <button
                            key={option.id}
                            className={`px-4 py-2 rounded-full text-sm ${
                              selectedStartDate === option.id
                                ? "bg-primary text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handleStartDateChange(option.id)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {startDateOptions.slice(2).map((option) => (
                          <button
                            key={option.id}
                            className={`px-4 py-2 rounded-full text-sm ${
                              selectedStartDate === option.id
                                ? "bg-primary text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handleStartDateChange(option.id)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Filter Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button className="flex-1 bg-black hover:bg-black/90" onClick={applyFilters}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExplorePage