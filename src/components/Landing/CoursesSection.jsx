import { useState } from "react"
import { Button } from "@/components/ui/button"
import CourseCard from "./CourseCard"
import CustomButton from "../CustomButton"

// Sample data
const initialCourses = [
  {
    id: 1,
    title: "Google Data Analytics Course",
    thumbnail:
      "design image.png",
    category: "Design",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  {
    id: 2,
    title: "Google Data Analytics Course",
    thumbnail:
      "/music image.png",
    category: "Music",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  {
    id: 3,
    title: "Google Data Analytics Course",
    thumbnail:
      "/art image.png",
    category: "Art",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  {
    id: 4,
    title: "Google Data Analytics Course",
    thumbnail:
      "/music image.png",
    category: "Music",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  {
    id: 5,
    title: "Google Data Analytics Course",
    thumbnail:
      "/art image.png",
    category: "Art",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  {
    id: 6,
    title: "Google Data Analytics Course",
    thumbnail:
      "/design image.png",
    category: "Design",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  },
  ...Array(4).fill(null).map((_, index) => ({
    id: 7 + index,
    title: "Google Data Analytics Course",
    thumbnail:
      "design image.png",
    category: "Design",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  })),
  ...Array(4).fill(null).map((_, index) => ({
    id: 15 + index,
    title: "Google Data Analytics Course",
    thumbnail:
      "/music image.png",
    category: "Music",
    rating: 3.5,
    reviewCount: 123,
    price: 20000,
  }))
]

function CourseSection() {
  const [showAll, setShowAll] = useState(false)
  const [courses] = useState(initialCourses)

  const displayedCourses = showAll ? courses : courses.slice(0, 8)

  return (
    <section className="py-16">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Popular Courses</h2>
          {initialCourses > 8 && 
          <CustomButton 
            variant="ghost" 
            onClick={() => setShowAll(!showAll)} 
            className="text-primary hover:text-primary/90"
           >
            See All
          </CustomButton>
          }
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseSection

