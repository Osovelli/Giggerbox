import { useState } from "react"
import { useNavigate } from "react-router-dom"

import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"
import CategoryCard from "@/components/Authentication/GigCategoryCard"

const gigCategories = [
  "Graphic Design",
  "Content Writing",
  "Web Development",
  "Video Editing",
  "Photography",
  "Copywriting",
  "Logo Design",
  "Data Entry",
  "Virtual Assistance",
  "Transcription",
]

function GigPreferences() {
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const navigate = useNavigate()

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(category)) {
        newSelected.delete(category)
      } else {
        newSelected.add(category)
      }
      return newSelected
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCategories.size > 0) {
      // Add your logic here to handle the selected categories
      // For example, save to backend and redirect
      navigate("/identity-verification")
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Your Gig Preferences</h1>
          <p className="text-muted-foreground">
            Tell us about the types of gigs you plan to post.
            {selectedCategories.size > 0 && (
              <span className="ml-1 text-primary">({selectedCategories.size} selected)</span>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gigCategories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                selected={selectedCategories.has(category)}
                onClick={() => toggleCategory(category)}
              />
            ))}
          </div>

          <CustomButton 
          size="lg"
          type="submit" 
          className="w-full bg-black hover:bg-black/90" 
          disabled={selectedCategories.size === 0}
          >
            Continue
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default GigPreferences

