import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomRadioGroup from "@/components/CustomRadioGroup"
import CustomButton from "@/components/CustomButton"

const userTypes = [
  {
    value: "worker",
    title: "I'm a Gig Worker",
    description: "I want to find gigs, get hired for my skills, and earn money!",
  },
  {
    value: "poster",
    title: "I'm a Gig Poster",
    description: "I need talented people to help me get things done!",
  },
]

function UserType() {
  const [selectedType, setSelectedType] = useState("")
  const navigate = useNavigate()

  // Add console.log to debug state changes
  const handleTypeChange = (value) => {
    console.log("Selected type:", value) // Debug log
    setSelectedType(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedType) {
      // Navigate based on user type
      if (selectedType === "worker") {
        navigate("/gig-preferences")
      } else {
        navigate("/complete-profile")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">How would you like to use GigerBox?</h1>
          <p className="text-muted-foreground">
            Choose the option that best fits how you want to use our platform today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Update the CustomRadioGroup usage */}
          <CustomRadioGroup value={selectedType} onValueChange={handleTypeChange} items={userTypes} required />

          <CustomButton type="submit" className="w-full bg-black hover:bg-black/90" disabled={!selectedType}>
            Continue
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default UserType

