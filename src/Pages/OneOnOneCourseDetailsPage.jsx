import { useState } from "react"
import { ArrowLeft, Star, Play, Calendar, Clock, Check, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import EnrollmentSuccessModal from "@/components/Modals.jsx/EnrollmentSuccessModal"

const tabs = [
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
  { id: "chat", label: "Chat" },
]

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
  // Add more classes...
]

const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg",
    rating: 4.5,
    date: "Feb 2, 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bib...",
  },
  // Add more reviews...
]

const messages = [
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
    text: "Not yet, but I was thinking of going for a hike. Want to joinme?",
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
  const [activeTab, setActiveTab] = useState("details")
  const [newMessage, setNewMessage] = useState("")
  const navigate = useNavigate()
  const [isEnrollmentSuccessOpen, setIsEnrollmentSuccessOpen] = useState(false)

  const course = {
    title: "Introduction to Graphic Design",
    price: "20,000",
    learners: "2k",
    type: "1-on-1 course",
    duration: "20 hrs",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mattis justo diam, at fermentum mi euismod vitae. Integer pellentesque viverra molestie. Donec vel pellentesque lorem. Praesent tempor, velit vel viverra semper, urna ante posuere ante, id volutpat tortor leo nec turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

    Donec elementum mollis est, in mollis lorem ultrices et. Aenean posuere bibendum ipsum sit amet egestas. Cras consequat velit ante, maximus egestas sapien elementum nec. Nunc blandit sit amet elit eget pellentesque. Donec ac tortor dolor. Sed sit amet nunc eget leo viverra malesuada. Nam eget metus id risus dignissim euismod vel at erat. Ut euismod aliquam metus, vel finibus metus vestibulum sed. Praesent id eros lacinia, tincidunt metus et, iaculis erat. Curabitur fermentum porta sodales. Maecenas quam eros, pretium vel elit nec, consequat pellentesque dolor. Nunc quis massa eros. Lorem ipsum dol...`,
    instructor: {
      name: "John Doe",
      avatar: "/avatar.jpeg",
      rating: 3.5,
      reviews: 128,
    },
    availableStartDates: [
      { date: "Friday, 2 Feb", time: "9:20am" },
      { date: "Sun, 4 Feb", time: "1:00pm" },
      { date: "Tue, 6 Feb", time: "11:00am" },
      { date: "Wed, 7 Feb", time: "1:00pm" },
    ],
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add message handling logic here
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const handleScheduleAndPay = () => {
    // Add your payment logic here
    // After successful payment:
    setIsEnrollmentSuccessOpen(true)
  }

  const handleContinueAfterEnrollment = () => {
    setIsEnrollmentSuccessOpen(false)
    // Add any navigation or additional logic here
  }

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

      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-gray-900 rounded-lg relative">
              <video
                src="/course-preview.mp4"
                controls
                autoPlay
                loop
                muted // Remove this if you want sound
                poster="/course-preview.jpg"
                alt="Course Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Play className="h-8 w-8 text-white" fill="currentColor" />
                </button>
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
                  <p className="text-muted-foreground whitespace-pre-line">{course.description}</p>
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

            {activeTab === "chat" && (
              <div className="h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pb-4">
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
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t">
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
                  {activeTab === "details" ? "Available Start Dates" : "Date and Time"}
                </h3>

                {activeTab === "details" ? (
                  <div className="space-y-6">
                    {course.availableStartDates.map((slot, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium">{slot.date}</div>
                        <div className="text-sm text-muted-foreground">{slot.time}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {classSchedule.map((class_) => (
                      <div
                        key={class_.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg",
                          class_.completed && "bg-primary/10",
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span>{class_.id}.</span>
                            <span>{class_.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{class_.date}</span>
                            <Clock className="h-4 w-4 ml-2" />
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
                >
                  Schedule & Pay
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
        date="12 Sept. 2024"
        time="2 PM"
        tutorName="Allison Igwe"
        onContinue={handleContinueAfterEnrollment}
      />
    </div>
  )
}

export default OneOnOneCourseDetailsPage