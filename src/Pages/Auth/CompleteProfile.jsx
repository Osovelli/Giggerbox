import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload } from "lucide-react"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"

function CompleteProfile() {
  const [bio, setBio] = useState("")
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically upload the file and save the bio
    navigate("/job-preferences")
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Add examples of your work to attract potential clients.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brief Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Brief bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter bio"
              className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* CV Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              CV
              <span className="text-sm text-muted-foreground">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md border border-input bg-background text-sm cursor-pointer hover:bg-accent"
              >
                <Upload className="w-4 h-4" />
                <span>{file ? file.name : "Upload File"}</span>
              </label>
            </div>
          </div>

          <CustomButton type="submit" className="w-full bg-black hover:bg-black/90">
            Continue
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default CompleteProfile

