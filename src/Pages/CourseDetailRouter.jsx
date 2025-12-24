import { useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import useCourseStore from "@/store/courseStore"
import toast from "react-hot-toast"

/**
 * CourseDetailRouter - Dynamically routes to the correct course detail page
 * based on the course type (self-paced or one-on-one)
 */
function CourseDetailRouter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCourseById } = useCourseStore()
  const [courseType, setCourseType] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCourseType = async () => {
      try {
        setLoading(true)
        const response = await getCourseById(id)

        console.log('Course type fetched', response.type)
        
        if (response) {
          const type = response.type
          setCourseType(type)
          
          // Navigate to the appropriate route based on course type
          if (type === "self-paced") {
            navigate(`/dashboard/course/${id}/self-paced`, { replace: true, state: { course: response } },)
          } else if (type === "one-on-one") {
            navigate(`/dashboard/course/${id}/one-on-one`, { replace: true, state: { course: response } })
          } 
        } else {
          setError(true)
          toast.error("Course not found")
        }
      } catch (err) {
        console.error("Error fetching course:", err)
        setError(true)
        toast.error("Failed to load course details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourseType()
    }
  }, [id, getCourseById, navigate])

  // Show loading state while determining course type
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  // Show error state and redirect
  /* if (error) {
    return <Navigate to="/dashboard/explore" replace />
  } */

  // This should not be reached as navigation happens in useEffect
  return null
}

export default CourseDetailRouter