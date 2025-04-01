import { Star } from "lucide-react"

function CourseCard({ course }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-video overflow-hidden rounded-lg mb-3">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-muted-foreground">Self paced course</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getCategoryColor(course.category)}`}>{course.category}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground ml-1">
                {course.rating} ({course.reviewCount})
              </span>
            </div>
          </div>
        </div>
        <p className="font-medium">N {course.price.toLocaleString()}</p>
      </div>
    </div>
  )
}

function getCategoryColor(category) {
  switch (category.toLowerCase()) {
    case "design":
      return "text-blue-600"
    case "music":
      return "text-orange-600"
    case "art":
      return "text-green-600"
    default:
      return "text-primary"
  }
}

export default CourseCard