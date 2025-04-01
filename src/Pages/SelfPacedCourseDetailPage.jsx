import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Star, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import EnrollmentSuccessModal from "@/components/Modals.jsx/EnrollmentSuccessModal"
import CourseSidebar from "../components/CourseSidebar"

const tabs = [
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
]

// Sample course data
const course = {
  title: "Introduction to Graphic Design",
  price: "20,000",
  learners: "2k",
  type: "Self-paced course",
  duration: "20 hrs",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mattis justo diam, at fermentum mi euismod vitae. Integer pellentesque viverra molestie. Donec vel pellentesque lorem. Praesent tempor, velit vel viverra semper, urna ante posuere ante, id volutpat tortor leo nec turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  Donec elementum mollis est, in mollis lorem ultrices et. Aenean posuere bibendum ipsum sit amet egestas. Cras consequat velit ante, maximus egestas sapien elementum nec. Nunc blandit sit amet elit eget pellentesque. Donec ac tortor dolor. Sed sit amet nunc eget leo viverra malesuada. Nam eget metus id risus dignissim euismod vel at erat. Ut euismod aliquam metus, vel finibus metus vestibulum sed. Praesent id eros lacinia, tincidunt metus et, iaculis erat. Curabitur fermentum porta sodales. Maecenas quam eros, pretium vel elit nec, consequat pellentesque dolor. Nunc quis massa eros.`,
  instructor: {
    name: "John Doe",
    avatar: "/avatar.jpeg",
    rating: 3.5,
    reviews: 128,
  },
  sections: [
    {
      id: 1,
      title: "SECTION 1",
      lessons: [
        { id: 1, title: "Title goes in here", duration: "5:18", active: true, completed: false },
        { id: 2, title: "Title goes in here", duration: "4:32", completed: false },
        { id: 3, title: "Title goes in here", duration: "6:45", completed: false },
        { id: 4, title: "Title goes in here", duration: "3:21", completed: false },
        { id: 5, title: "Title goes in here", duration: "7:15", completed: false },
        { id: 6, title: "Title goes in here", duration: "5:50", completed: false },
        { id: 7, title: "Title goes in here", duration: "8:22", completed: false },
      ],
    },
    {
      id: 2,
      title: "SECTION 2",
      lessons: [
        { id: 1, title: "Introduction to Section 2", duration: "5:45", completed: false },
        { id: 2, title: "Advanced Concepts", duration: "10:20", completed: false },
      ],
    },
    {
      id: 3,
      title: "SECTION 3",
      lessons: [
        { id: 1, title: "Section 3 Overview", duration: "5:10", completed: false },
        { id: 2, title: "Practical Applications", duration: "15:30", completed: false },
      ],
    },
    {
      id: 4,
      title: "SECTION 4",
      lessons: [{ id: 1, title: "Final Project Introduction", duration: "5:25", completed: false }],
    },
    {
      id: 5,
      title: "SECTION 5",
      lessons: [{ id: 1, title: "Course Conclusion", duration: "5:15", completed: false }],
    },
  ],
}

const reviews = [
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
  const [activeTab, setActiveTab] = useState("details")
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isEnrollmentSuccessOpen, setIsEnrollmentSuccessOpen] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState(1)
  const [currentLessonId, setCurrentLessonId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const navigate = useNavigate()

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
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(currentProgress)
      setCurrentTime(formatTime(videoRef.current.currentTime))
    }
  }

  const handleLessonSelect = (sectionId, lessonId) => {
    setCurrentSectionId(sectionId)
    setCurrentLessonId(lessonId)
    // In a real app, you would load the selected lesson's video here
    // For demo purposes, we'll just reset the video
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
    // Add navigation logic here
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
  }, [])

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
                <span>₦ {course.price}</span>
                <span>•</span>
                <span>{course.learners} learners</span>
                <span>•</span>
                <span>{course.type}</span>
                <span>•</span>
                <span>{course.duration}</span>
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
              >
                <source src="/placeholder.mp4" type="video/mp4" />
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
                        {course.sections[currentSectionId - 1]?.lessons[currentLessonId - 1]?.title ||
                          "Title goes in here"}
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
                  <p className="text-muted-foreground">
                    {isDescriptionExpanded ? course.description : `${course.description.slice(0, 500)}...`}
                  </p>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-primary hover:underline mt-2"
                  >
                    {isDescriptionExpanded ? "Show less" : "Show all"}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img src={course.instructor.avatar || "/placeholder.svg"} alt="" className="h-12 w-12 rounded-full" />
                  <div>
                    <h3 className="font-medium">{course.instructor.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(course.instructor.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < course.instructor.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({course.instructor.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <h2 className="text-lg font-semibold">What people are saying</h2>

                {/* Overall Rating */}
                <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold">4.5</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
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
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <img src={review.avatar || "/placeholder.svg"} alt="" className="h-10 w-10 rounded-full" />
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
                sections={course.sections}
                currentSectionId={currentSectionId}
                currentLessonId={currentLessonId}
                onLessonSelect={handleLessonSelect}
                videoProgress={progress}
                isPlaying={isPlaying}
                volume={volume}
                onPlayPause={handlePlayPause}
                onVolumeChange={handleVolumeChange}
                onSeek={handleSeek}
              />

              <div className="p-4 border-t">
                <Button className="w-full bg-black hover:bg-black/90" onClick={handleEnrollAndPay}>
                  Enrol & Pay
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
        tutorName={course.instructor.name}
        onContinue={handleContinueAfterEnrollment}
      />
    </div>
  )
}

export default SelfPacedCourseDetails