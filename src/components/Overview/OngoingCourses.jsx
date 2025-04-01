import { Clock } from "lucide-react"

const ongoingCourses = [
  {
    id: 1,
    title: "Google Data Analytics Course",
    thumbnail: "/colleagues.png",
    status: "Ongoing",
    studentName: "[Student Name]",
    nextClass: "1-on-1 class",
    date: "22-01-2024",
  },
  {
    id: 2,
    title: "Google Data Analytics Course",
    thumbnail: "/handheld phone.png",
    status: "Ongoing",
    studentName: "[Student Name]",
    nextClass: "1-on-1 class",
    date: "22-01-2024",
  },
  {
    id: 3,
    title: "Google Data Analytics Course",
    thumbnail: "/headphones.png",
    status: "Ongoing",
    studentName: "[Student Name]",
    nextClass: "1-on-1 class",
    date: "22-01-2024",
  },
  {
    id: 4,
    title: "Google Data Analytics Course",
    thumbnail: "/colleagues.png",
    status: "Ongoing",
    studentName: "[Student Name]",
    nextClass: "1-on-1 class",
    date: "22-01-2024",
  },
  // Add more courses as needed
]

function OngoingCourses() {
  return (
    <div className="bg-white rounded-lg p-4 border">
      <h2 className="font-semibold mb-2">Ongoing courses</h2>
      <p className="text-sm text-muted-foreground mb-4">Continue where you left off</p>
      <div className="space-y-4">
        {ongoingCourses.map((course) => (
          <div key={course.id} className="flex gap-3">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-20 h-14 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{course.title}</h3>
              <div className="flex gap-1 text-xs">
                <span className="text-red-500">{course.status}</span>
                <span className="text-muted-foreground">
                  {course.nextClass} with 
                </span>
              </div>
              <span className="text-xs">{course.studentName}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{course.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OngoingCourses

