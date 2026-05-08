import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Star, Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PublishCourseModal from "@/components/Modals.jsx/PublishCourseModal"
import useCourseStore from "@/store/courseStore"
import toast from "react-hot-toast"

function CoursePreview() {
  const navigate = useNavigate()
  const { createCourse, loading: apiLoading } = useCourseStore()
  const [activeSection, setActiveSection] = useState(0)
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
        videoUrl: courseData.videoUrl,
        lessons: courseData.lessons.title || [],
        availableTimes: [],
        promo: courseData.promo,
      }

      console.log("Submitting course payload:", payload)

      const result = await createCourse(payload)
      
      if (result) {
        //toast.success("Course published successfully!")
        // Clear sessionStorage
        sessionStorage.removeItem('courseData')
        // Navigate to course detail or dashboard
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
                  Preview how your course will appear and ensure everything is ready.
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
          <div className="flex items-center gap-4 text-sm">
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
          {/* Video Player and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
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

            {/* About the Course */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About the course</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {courseData.description}
              </p>
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
                  <span className="text-muted-foreground">Lessons:</span>
                  <span className="ml-2 font-medium">{courseData.lessons?.length || 0}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium capitalize">{courseData.type?.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-2 font-medium">₦{courseData.price?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Sections */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Course Content</h3>
              <div className="space-y-2">
                {courseData.lessons && courseData.lessons.length > 0 ? (
                  courseData.lessons.map((lesson, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-full flex items-start justify-between p-3 rounded-lg text-left transition-colors ${
                        activeSection === index 
                          ? "bg-primary text-white" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{index + 1}.</span>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <p className={`text-xs ${activeSection === index ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {lesson.description?.slice(0, 60)}...
                        </p>
                      </div>
                      {lesson.videos && lesson.videos.length > 0 && (
                        <span className={`text-xs ${activeSection === index ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No lessons added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublishCourseModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSubmit={handleSubmitForReview}
      />
    </div>
  )
}

export default CoursePreview