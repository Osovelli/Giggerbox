import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { CustomProgress } from "../CustomProgress"
import { Star, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

function CourseItem({ course }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/courses/${course.id}`)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-24 h-16 object-cover rounded-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(course.status)}`}></div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
            </div>
            <p className="text-gray-600 line-clamp-2 mb-2">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Instructor: {course.instructor}</span>
              <span>•</span>
              <span>Type: {course.type}</span>
              <span>•</span>
              <span>
                {formatDate(course.startDate)} - {formatDate(course.endDate)}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewDetails}>View Course</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}/materials`)}>
              Course Materials
            </DropdownMenuItem>
            {course.status === "ongoing" && (
              <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}/schedule`)}>
                View Schedule
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {course.status === "ongoing" && (
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            
          </div>
          <CustomProgress value={course.progress} className="h-3 max-w-sm"/>
          <span>{course.progress}%</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm">Rate this course</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          Continue Learning
        </Button>
      </div>
    </div>
  )
}

export default CourseItem