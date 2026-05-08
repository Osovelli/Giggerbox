import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Star, Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PublishCourseModal from "@/components/Modals.jsx/PublishCourseModal"
import useCourseStore from "@/store/courseStore"
import toast from "react-hot-toast"

function OneOnOneCoursePreview() {
  const navigate = useNavigate()
  const { createCourse, loading: apiLoading } = useCourseStore()
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [publishing, setPublishing] = useState(false)

  // Load course data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem('courseData')
    if (!savedData) {
      toast.error("Course data not found. Please start from the beginning.")
      navigate("/dashboard/create-course")
      return
    }
    setCourseData(JSON.parse(savedData))
  }, [navigate])

  // Format available times for display
  const getFormattedAvailableTimes = () => {
    if (!courseData || !courseData.availableTimes) return []
    
    const formatted = []
    courseData.availableTimes.forEach((slot) => {
      const dayName = slot.day.charAt(0).toUpperCase() + slot.day.slice(1)
      slot.times.forEach((time) => {
        // Convert 24h time to 12h format
        const [hours, minutes] = time.split(':')
        const hour = parseInt(hours)
        const period = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        formatted.push({
          day: dayName,
          time: `${displayHour}:${minutes} ${period}`,
        })
      })
    })
    return formatted
  }

  const formattedTimes = getFormattedAvailableTimes()

  const handlePublish = () => {
    setIsPublishModalOpen(true)
  }

  const handleSubmitForReview = async () => {
    try {
      setPublishing(true)
      setIsPublishModalOpen(false)

      // Prepare payload for API
      const payload = {
        title: courseData.title,
        description: courseData.description,
        type: courseData.type,
        price: courseData.price,
        duration: courseData.duration,
        videoUrl: courseData.videoUrl || "",
        lessons: [],
        availableTimes: courseData.availableTimes,
        promo: courseData.promo,
      }

      const result = await createCourse(payload)
      
      if (result && result.data) {
        //toast.success("Course published successfully!")
        // Clear sessionStorage
        sessionStorage.removeItem('courseData')
        // Navigate to dashboard or my creations
        navigate("/dashboard/creations", { state: { view: "courses" } })
      } else {
        toast.error("Failed to publish course")
      }
    } catch (error) {
      console.error("Error publishing course:", error)
      toast.error(error.message || "Failed to publish course")
    } finally {
      setPublishing(false)
    }
  }

  if (!courseData || publishing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {publishing ? "Publishing your course..." : "Loading preview..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">Review and Publish Your Course</h1>
                <p className="text-sm text-muted-foreground">
                  Preview how your 1-on-1 course will appear and ensure everything is ready.
                </p>
              </div>
            </div>
            <Button onClick={handlePublish} className="bg-black hover:bg-black/90" disabled={apiLoading}>
              {apiLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Course"
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-semibold mb-2">{courseData.title}</h2>
          <div className="flex items-center gap-2 text-sm">
            <span>₦ {courseData.price?.toLocaleString()}</span>
            <span>•</span>
            <span className="capitalize">{courseData.type?.replace('-', ' ')}</span>
            <span>•</span>
            <span>{courseData.duration} weeks</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview (if available) */}
            {courseData.videoUrl && (
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                <video 
                  src={courseData.videoUrl} 
                  controls
                  poster="/course preview thumbnail.png" 
                  className="w-full h-full object-contain"
                >
                  <source src={courseData.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* About the Course */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About the course</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {isDescriptionExpanded 
                  ? courseData.description 
                  : courseData.description.length > 500
                    ? courseData.description.slice(0, 500) + "..."
                    : courseData.description
                }
              </p>
              {courseData.description.length > 500 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-primary hover:underline"
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/* Course Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Course Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium">{courseData.duration} weeks</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium capitalize">{courseData.type?.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-2 font-medium">₦{courseData.price?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Available Times:</span>
                  <span className="ml-2 font-medium">{formattedTimes.length} slots</span>
                </div>
              </div>
            </div>

            {/* Category & Promo */}
            <div className="flex gap-4">
              <div className="flex-1 p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <p className="font-medium capitalize">{courseData.category}</p>
              </div>
              {courseData.promo && (
                <div className="flex-1 p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Promo Code</p>
                  <p className="font-medium">{courseData.promo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-primary font-medium mb-4">Available Time Slots</h3>
              {formattedTimes.length > 0 ? (
                <div className="space-y-3">
                  {formattedTimes.slice(0, 8).map((slot, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium">{slot.day}</div>
                      <div className="text-sm text-muted-foreground">{slot.time}</div>
                    </div>
                  ))}
                  {formattedTimes.length > 8 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{formattedTimes.length - 8} more time slots
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No availability set
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      <PublishCourseModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSubmit={handleSubmitForReview}
      />
    </div>
  )
}

export default OneOnOneCoursePreview