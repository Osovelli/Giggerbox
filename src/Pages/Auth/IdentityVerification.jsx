import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AuthLayout from "@/components/Authentication/AuthLayout"

// Sample countries data
const countries = [
  { value: "ng", label: "Nigeria" },
  { value: "gh", label: "Ghana" },
  { value: "ke", label: "Kenya" },
  // Add more countries as needed
]

function IdentityVerification() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nationality: "",
    dateOfBirth: "",
    address: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your verification logic here
    navigate("/document-verification")
  }

  const handleSkip = () => {
    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Identity Verification</h1>
          <p className="text-muted-foreground">Verify your identity to build trust with gig seekers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nationality */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nationality</label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, nationality: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of birth</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter DOB"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Residential Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Residential Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Search building name or street name"
              className="mb-2"
            />
            <p className="text-sm text-muted-foreground">e.g, 112, Mobolaji bank anthony street, Ikeja</p>
          </div>

          {/* BVN Information */}
          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground">
              Giggerz wants to access your BVN Information. By clicking Continue, you agree to allow Giggerz to:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your personal details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your contact information
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your document information
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-black hover:bg-black/90">
              Continue
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default IdentityVerification

