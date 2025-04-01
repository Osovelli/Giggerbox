import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import PublishCourseModal from "@/components/Modals.jsx/PublishCourseModal"

function CoursePreview() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(1)
  // In the CoursePreview component, add state for modal visibility
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  // Sample course data - in a real app, this would come from your state management
  const course = {
    title: "Introduction to Graphic Design",
    price: "20,000",
    learners: "2k",
    type: "Self paced course",
    duration: "20 hrs",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus. Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mattis justo diam, at fermentum mi euismod vitae. Integer pellentesque viverra molestie. Donec vel pellentesque lorem. Praesent tempor, velit vel viverra semper, urna ante posuere ante, id volutpat tortor leo nec turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

    Donec elementum mollis est, in mollis lorem ultrices et. Aenean posuere bibendum ipsum sit amet egestas. Cras consequat velit ante, maximus egestas sapien elementum nec. Nunc blandit sit amet elit eget pellentesque. Donec ac tortor dolor. Sed sit amet nunc eget leo viverra malesuada. Nam eget metus id risus dignissim euismod vel at erat. Ut euismod aliquam metus, vel finibus metus vestibulum sed. Praesent id eros lacinia, tincidunt metus et, iaculis erat. Curabitur fermentum magna porta sodales. Maecenas quam eros, pretium vel elit nec, consequat pellentesque dolor. Nunc quis massa eros.`,
    instructor: {
      name: "John Doe",
      rating: 2.5,
      reviews: 108,
    },
    sections: [
      {
        id: 1,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 2,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 3,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 4,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 5,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 6,
        title: "Title goes in here",
        duration: "5:05",
      },
      {
        id: 7,
        title: "Title goes in here",
        duration: "5:05",
      },
    ],
  }

  // Update the handlePublish function
  const handlePublish = () => {
    setIsPublishModalOpen(true)
  }

  const handleSubmitForReview = () => {
    // Add your submit for review logic here
    console.log("Submitting course for review...")
    // Close the modal
    setIsPublishModalOpen(false)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">Review and Publish Your Course</h1>
                <p className="text-sm text-muted-foreground">
                  Preview how your course will appear to gig workers and ensure everything is ready.
                </p>
              </div>
            </div>
            <Button onClick={handlePublish} className="bg-black hover:bg-black/90">
              Publish Course
            </Button>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
          <div className="flex items-center gap-4 text-sm">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="aspect-video bg-gray-900 rounded-lg relative">
              <video src="/video.mp4" autoPlay loop muted poster="/course preview thumbnail.png" className="absolute inset-0 flex items-center justify-center">
                <button className=" z-10 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Play className="h-8 w-8 text-white" fill="currentColor"  />
                </button>
              </video>
            </div>

            {/* About the Course */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About the course</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {course.description.length > 500 ? course.description.slice(0, 500) + "..." : course.description}
              </p>
              {course.description.length > 500 && <button className="text-primary hover:underline">Show all</button>}
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <img src="/avatar.jpeg" alt={course.instructor.name} className="h-12 w-12 rounded-full" />
              <div>
                <h4 className="font-medium">{course.instructor.name}</h4>
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

          {/* Course Sections */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-primary">SECTION 1</h3>
              <div className="space-y-1">
                {course.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      activeSection === section.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{section.id}.</span>
                      <span>{section.title}</span>
                    </div>
                    <span className="text-sm">{section.duration}</span>
                  </button>
                ))}
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