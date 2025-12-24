import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Star, Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import EnrollmentSuccessModal from "@/components/Modals.jsx/EnrollmentSuccessModal"
import CourseSidebar from "../components/CourseSidebar"
import useCourseStore from "@/store/courseStore"
import toast from "react-hot-toast"

const tabs = [
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
]

// Sample reviews data (to be replaced with real data when available)
const sampleReviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatar.jpeg",
    rating: 4.5,
    date: "Feb 2, 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bib...",
  },
]

function SelfPacedCourseDetails() {
  const { getCourseById, loading } = useCourseStore()
  //const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("details")
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isEnrollmentSuccessOpen, setIsEnrollmentSuccessOpen] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [showControls, setShowControls] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)

  const stateCourse = location.state?.course

  useEffect(() => {
    if (stateCourse) {
      setCourse(stateCourse)
    }
  }, [stateCourse])


  // Fetch course details
  /* useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id)
        
        if (response && response.data) {
          setCourse(response.data)
        } else {
          toast.error("Course not found")
          navigate("/dashboard/courses")
        }
      } catch (error) {
        console.error("Error fetching course details:", error)
        toast.error("Failed to load course details")
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id, getCourseById, navigate]) */

  // Transform lessons data into sections format for the sidebar
  const getSectionsFromLessons = () => {
    if (!course || !course.lessons || course.lessons.length === 0) {
      return []
    }

    return course.lessons.map((lesson, index) => ({
      id: index + 1,
      title: `LESSON ${index + 1}`,
      lessons: [
        {
          id: 1,
          title: lesson.title,
          duration: lesson.duration || "0:00",
          active: index === currentSectionIndex,
          completed: false,
          description: lesson.description,
          resources: lesson.resources || [],
          videos: lesson.videos || [],
        },
      ],
    }))
  }

  const sections = getSectionsFromLessons()

  // Handle video controls
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
      videoRef.current.volume = value / 100
      setVolume(value)
      if (value === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handleSeek = (value) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration
      videoRef.current.currentTime = time
      setProgress(value)
    }
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(currentProgress || 0)
      setCurrentTime(formatTime(videoRef.current.currentTime))
    }
  }

  const handleLessonSelect = (sectionIndex, lessonIndex) => {
    setCurrentSectionIndex(sectionIndex)
    setCurrentLessonIndex(lessonIndex)
    
    // Reset video
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setProgress(0)
      setCurrentTime("0:00")
      if (isPlaying) {
        videoRef.current.play()
      }
    }
  }

  const handleEnrollAndPay = () => {
    setIsEnrollmentSuccessOpen(true)
  }

  const handleContinueAfterEnrollment = () => {
    setIsEnrollmentSuccessOpen(false)
    // Navigate to courses or my learning
    navigate("/dashboard/my-case")
  }

  // Auto-hide controls after inactivity
  useEffect(() => {
    const handleActivity = () => {
      setShowControls(true)
      setLastActivity(Date.now())
    }

    const hideControlsTimer = setInterval(() => {
      if (Date.now() - lastActivity > 3000 && isPlaying) {
        setShowControls(false)
      }
    }, 1000)

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("click", handleActivity)

    return () => {
      clearInterval(hideControlsTimer)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("click", handleActivity)
    }
  }, [lastActivity, isPlaying])

  // Set video duration when metadata is loaded
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(formatTime(videoRef.current.duration))
      }
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [course])

  // Loading state
  if (loading || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    )
  }

  // Calculate total hours from duration (in weeks)
  const totalHours = course.duration ? `${course.duration} weeks` : "N/A"
  const learnerCount = course.enrollmentCount || "0"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">{course.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>₦ {course.price?.toLocaleString()}</span>
                <span>•</span>
                <span>{learnerCount} learners</span>
                <span>•</span>
                <span className="capitalize">{course.type?.replace("-", " ")}</span>
                <span>•</span>
                <span>{totalHours}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-6">
            {/* Video Player */}
            <div
              ref={videoContainerRef}
              className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden"
              onMouseEnter={() => setShowControls(true)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster="/course preview thumbnail.png"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                src={course.videoUrl}
              >
                <source src={course.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls Overlay */}
              {showControls && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-xs">{currentTime}</span>
                      <div className="flex-1 relative">
                        <Progress
                          value={progress}
                          className="h-1 cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const percent = ((e.clientX - rect.left) / rect.width) * 100
                            handleSeek(percent)
                          }}
                        />
                      </div>
                      <span className="text-xs">{duration}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={handlePlayPause} className="text-white hover:text-primary transition-colors">
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </button>

                        <div className="flex items-center gap-2">
                          <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>

                          <div className="w-20">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => handleVolumeChange(Number.parseInt(e.target.value))}
                              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-white text-sm">
                        {course.lessons?.[currentSectionIndex]?.title || "Course Video"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Play Button Overlay (when paused) */}
              {!isPlaying && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                  onClick={handlePlayPause}
                >
                  <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Play className="h-8 w-8 text-white" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={cn(
                      "pb-2 text-sm font-medium",
                      activeTab === tab.id ? "border-b-2 border-primary text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">About the course</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {isDescriptionExpanded 
                      ? course.description 
                      : course.description.length > 500 
                        ? `${course.description.slice(0, 500)}...` 
                        : course.description
                    }
                  </p>
                  {course.description.length > 500 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-primary hover:underline mt-2"
                    >
                      {isDescriptionExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>

                {/* Course Details */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold mb-3">Course Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="ml-2 font-medium">{course.duration} weeks</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="ml-2 font-medium">{course.lessons?.length || 0}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Course Type:</span>
                      <span className="ml-2 font-medium capitalize">{course.type?.replace("-", " ")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="ml-2 font-medium">₦{course.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {course.tutor?.email?.charAt(0).toUpperCase() || "T"}
                  </div>
                  <div>
                    <h3 className="font-medium">Instructor</h3>
                    <p className="text-sm text-muted-foreground">{course.tutor?.email || "Course Instructor"}</p>
                  </div>
                </div>

                {/* Lessons Overview */}
                {course.lessons && course.lessons.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Course Content</h3>
                    <div className="space-y-3">
                      {course.lessons.map((lesson, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-1">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                          {lesson.resources && lesson.resources.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {lesson.resources.length} resource{lesson.resources.length > 1 ? "s" : ""} available
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <h2 className="text-lg font-semibold">What people are saying</h2>

                {/* Overall Rating */}
                <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{course.rating || "N/A"}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(course.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.reviewCount || 0} review{course.reviewCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground w-3">{rating}</div>
                        <Progress value={rating === 5 ? 75 : rating === 4 ? 20 : 5} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <button className="text-primary text-sm hover:underline">More</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-6 bg-white rounded-lg border overflow-hidden">
              <CourseSidebar
                sections={sections}
                currentSectionId={currentSectionIndex + 1}
                currentLessonId={currentLessonIndex + 1}
                onLessonSelect={(sectionId, lessonId) => handleLessonSelect(sectionId - 1, lessonId - 1)}
                videoProgress={progress}
                isPlaying={isPlaying}
                volume={volume}
                onPlayPause={handlePlayPause}
                onVolumeChange={handleVolumeChange}
                onSeek={handleSeek}
              />

              <div className="p-4 border-t">
                <Button className="w-full bg-black hover:bg-black/90" onClick={handleEnrollAndPay}>
                  Enrol & Pay - ₦{course.price?.toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnrollmentSuccessModal
        isOpen={isEnrollmentSuccessOpen}
        onClose={() => setIsEnrollmentSuccessOpen(false)}
        courseTitle={course.title}
        date="Start anytime"
        time="Self-paced"
        tutorName={course.tutor?.email || "Instructor"}
        onContinue={handleContinueAfterEnrollment}
      />
    </div>
  )
}

export default SelfPacedCourseDetails