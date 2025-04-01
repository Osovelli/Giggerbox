import { Link } from "react-router-dom"
import CourseCard from "./CourseCard"

const courses = [
  {
    id: 1,
    title: "Google Data Analytics Course",
    thumbnail: "/colleagues.png",
    category: "Design",
    rating: "3.5",
    reviewCount: "128",
    price: 20000,
  },
  {
    id: 2,
    title: "Google Data Analytics Course",
    thumbnail: "/handheld phone.png",
    category: "Design",
    rating: "3.5",
    reviewCount: "128",
    price: 20000,
  },
  {
    id: 3,
    title: "Google Data Analytics Course",
    thumbnail: "/headphones.png",
    category: "Design",
    rating: "3.5",
    reviewCount: "128",
    price: 20000,
  },
  {
    id: 4,
    title: "Google Data Analytics Course",
    thumbnail: "/headphones.png",
    category: "Design",
    rating: "3.5",
    reviewCount: "128",
    price: 20000,
  },
  {
    id: 5,
    title: "Google Data Analytics Course",
    thumbnail: "/headphones.png",
    category: "Design",
    rating: "3.5",
    reviewCount: "128",
    price: 20000,
  },
  // Add more courses as needed
]

function PopularCourses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Popular Courses</h2>
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">
          See All
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default PopularCourses