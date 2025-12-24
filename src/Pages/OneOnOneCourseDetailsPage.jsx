import { useEffect, useState } from "react"
import { ArrowLeft, Star, Play, Calendar, Clock, Check, Paperclip, Smile, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import EnrollmentSuccessModal from "@/components/Modals.jsx/EnrollmentSuccessModal"
import useCourseStore from "@/store/courseStore"
import toast from "react-hot-toast"

const tabs = [
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
  { id: "chat", label: "Chat" },
]

// Sample data for class schedule (to be replaced with real data when available)
const classSchedule = [
  {
    id: 1,
    title: "Class Title Goes in Here",
    date: "26th October 2024",
    time: "2pm",
    completed: true,
  },
  {
    id: 2,
    title: "Class Title Goes in Here",
    date: "26th October 2024",
    time: "2pm",
    completed: true,
  },
  {
    id: 3,
    title: "Class Title Goes in Here",
    date: "26th October 2024",
    time: "2pm",
    completed: false,
  },
]

// Sample reviews (to be replaced with real data when available)
const sampleReviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg",
    rating: 4.5,
    date: "Feb 2, 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bib...",
  },
]

// Sample messages (to be replaced with real chat data when available)
const sampleMessages = [
  {
    id: 1,
    text: "Hey, what's up? 😊",
    sender: "user",
    time: "10:05 PM",
  },
  {
    id: 2,
    text: "Not much, just getting some work done. How about you?",
    sender: "instructor",
    time: "10:05 PM",
  },
  {
    id: 3,
    text: "Same here, just finishing up a project. Do you have any plans for the weekend? 😃",
    sender: "user",
    time: "10:05 PM",
  },
  {
    id: 4,
    text: "Not yet, but I was thinking of going for a hike. Want to join me?",
    sender: "instructor",
    time: "10:05 PM",
  },
  {
    id: 5,
    text: "That sounds great! Which trail were you thinking of? 😊",
    sender: "user",
    time: "10:05 PM",
  },
]

function OneOnOneCourseDetailsPage() {
  const { getCourseById, loading } = useCourseStore()
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [course, setCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("details")
  const [newMessage, setNewMessage] = useState("")
  const [isEnrollmentSuccessOpen, setIsEnrollmentSuccessOpen] = useState(false)
  const [messages, setMessages] = useState(sampleMessages)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

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

  const stateCourse = location.state?.course
  
  useEffect(() => {
    if (stateCourse) {
      setCourse(stateCourse)
    }
  }, [stateCourse])


  // Transform available times into a more readable format
  const getAvailableStartDates = () => {
    if (!course || !course.availableTimes || course.availableTimes.length === 0) {
      return []
    }

    const formattedDates = []
    course.availableTimes.forEach((timeSlot) => {
      const day = timeSlot.day.charAt(0).toUpperCase() + timeSlot.day.slice(1)
      timeSlot.times.forEach((time) => {
        formattedDates.push({
          day: day,
          time: time,
        })
      })
    })

    return formattedDates
  }

  const availableStartDates = getAvailableStartDates()

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleScheduleAndPay = () => {
    setIsEnrollmentSuccessOpen(true)
  }

  const handleContinueAfterEnrollment = () => {
    setIsEnrollmentSuccessOpen(false)
    navigate("/dashboard/my-case")
  }

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

  // Calculate display values
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

      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-gray-900 rounded-lg relative">
              <video
                src={course.videoUrl || "/course-preview.mp4"}
                controls
                poster="/course-preview.jpg"
                className="w-full h-full object-cover rounded-lg"
              >
                <source src={course.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" fill="currentColor" />
                </div>
              </div>
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
                          {lesson.availableTimes && lesson.availableTimes.length > 0 && (
                            <div className="mt-2 text-xs text-primary">
                              Flexible scheduling available
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

            {activeTab === "chat" && (
              <div className="h-[600px] flex flex-col border rounded-lg">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.sender === "user" ? "justify-start" : "justify-end")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2",
                          message.sender === "user" ? "bg-gray-100" : "bg-primary text-primary-foreground",
                        )}
                      >
                        <p>{message.text}</p>
                        <div
                          className={cn(
                            "text-xs mt-1",
                            message.sender === "user" ? "text-muted-foreground" : "text-primary-foreground/80",
                          )}
                        >
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-4 border-t">
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Smile className="h-6 w-6" />
                  </button>
                  <Input
                    type="text"
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Paperclip className="h-6 w-6" />
                  </button>
                  <Button type="submit">Send</Button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border p-6 space-y-6">
                <h3 className="text-primary font-medium">
                  {activeTab === "details" ? "Available Time Slots" : "Class Schedule"}
                </h3>

                {activeTab === "details" ? (
                  <div className="space-y-4">
                    {availableStartDates.length > 0 ? (
                      availableStartDates.map((slot, index) => (
                        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="font-medium">{slot.day}</div>
                          <div className="text-sm text-muted-foreground">{slot.time}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No available time slots at the moment. Contact the instructor for scheduling.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {classSchedule.map((class_) => (
                      <div
                        key={class_.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border",
                          class_.completed && "bg-primary/10 border-primary/20",
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{class_.id}.</span>
                            <span className="text-sm">{class_.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{class_.date}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{class_.time}</span>
                          </div>
                        </div>
                        {class_.completed && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  className="w-full bg-black hover:bg-black/90" 
                  onClick={handleScheduleAndPay}
                  disabled={availableStartDates.length === 0}
                >
                  Schedule & Pay - ₦{course.price?.toLocaleString()}
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
        date={availableStartDates[0]?.day || "To be scheduled"}
        time={availableStartDates[0]?.time || "Flexible"}
        tutorName={course.tutor?.email || "Instructor"}
        onContinue={handleContinueAfterEnrollment}
      />
    </div>
  )
}

export default OneOnOneCourseDetailsPage