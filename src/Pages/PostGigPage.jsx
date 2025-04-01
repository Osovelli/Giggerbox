import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, DollarSign, X, Plus, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import GigPreviewModal from "@/components/Modals.jsx/postGig/GigPreviewModal"
import GigSuccessModal from "@/components/Modals.jsx/postGig/GigSuccessModal"
import GigErrorModal from "@/components/Modals.jsx/postGig/GigErrorModal"
import SkillBadge from "@/components/Gigs/SkillBadge"
import CustomButton from "@/components/CustomButton"

// Sample skills for demonstration
const availableSkills = [
  { id: 1, name: "Graphic Design" },
  { id: 2, name: "Content Writing" },
  { id: 3, name: "Photography" },
  { id: 4, name: "Data Entry" },
  { id: 5, name: "Web Development" },
  { id: 6, name: "Mobile App Development" },
  { id: 7, name: "UI/UX Design" },
  { id: 8, name: "Video Editing" },
]

function PostGigPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "flexible", // 'on_date', 'before_date', 'flexible'
    location: "", // 'on_site', 'remote'
    budget: "",
  })
  const [selectedSkills, setSelectedSkills] = useState([1, 2, 3, 4])
  const [searchSkill, setSearchSkill] = useState("")
  const [uploadedImages, setUploadedImages] = useState([
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home%20%2813%29-wL2wIQFFkkRcvtfLBcfiUFc0sc2l3b.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Successful%20%281%29-pb2qs2gBqZXc6plVMPcxTRHC0F2nW3.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Unsuccessful-Yb4jaONGz7KaGAeRCZmz52LaImJAp8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Playground%20%2819%29-HSrCcFl4u1zMm15lqTD9hyAWgZqlFf.png",
  ])
  const [errors, setErrors] = useState({})

  // Modals state
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleDeadlineChange = (value) => {
    setFormData({ ...formData, deadline: value })
  }

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value })
  }

  const handleSkillToggle = (skillId) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a local URL for preview
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 10)) // Limit to 10 images
    }
  }

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 70) {
      newErrors.title = "Title must be less than 70 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length > 2000) {
      newErrors.description = "Description must be less than 2000 characters"
    }

    if (!formData.location) {
      newErrors.location = "Location is required"
    }

    if (!formData.budget) {
      newErrors.budget = "Budget is required"
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = "Budget must be a positive number"
    }

    if (selectedSkills.length === 0) {
      newErrors.skills = "At least one skill is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      setShowPreview(true)
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const handleSubmitGig = () => {
    setShowPreview(false)

    // Simulate API call
    setTimeout(() => {
      // Randomly show success or error for demonstration
      const hasEnoughBalance = Math.random() > 0.3

      if (hasEnoughBalance) {
        setShowSuccessModal(true)
      } else {
        setShowErrorModal(true)
      }
    }, 1000)
  }

  const handleSuccessContinue = () => {
    setShowSuccessModal(false)
    navigate("/my-creations")
  }

  const handleFundWallet = () => {
    setShowErrorModal(false)
    navigate("/wallet")
  }

  const handleRetry = () => {
    setShowErrorModal(false)
    handleSubmitGig()
  }

  const filteredSkills = availableSkills.filter((skill) => skill.name.toLowerCase().includes(searchSkill.toLowerCase()))

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-semibold mb-2">Post a Gig</h1>
        <p className="text-muted-foreground">Share what you need and get it done quickly by the right expert.</p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Gig Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Gig title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Design a logo for my new business"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          <p className="text-xs text-muted-foreground text-right">Maximum of 70 characters</p>
        </div>

        {/* Gig Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Gig description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the task to be done..."
            rows={6}
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <p className="text-xs text-muted-foreground text-right">Maximum of 2,000 characters</p>
        </div>

        {/* Deadline */}
        <div className="space-y-4">
          <Label>When do you need this done?</Label>
          <RadioGroup value={formData.deadline} onValueChange={handleDeadlineChange} className="grid grid-cols-1 gap-2">
            <Label
              htmlFor="on_date"
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.deadline === "on_date" ? "bg-primary/5 border-primary" : "bg-muted/50"
              } cursor-pointer hover:bg-muted`}
            >
              <RadioGroupItem value="on_date" id="on_date" className="sr-only" />
              <span>On date</span>
            </Label>
            <Label
              htmlFor="before_date"
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.deadline === "before_date" ? "bg-primary/5 border-primary" : "bg-muted/50"
              } cursor-pointer hover:bg-muted`}
            >
              <RadioGroupItem value="before_date" id="before_date" className="sr-only" />
              <span>Before date</span>
            </Label>
            <Label
              htmlFor="flexible"
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.deadline === "flexible" ? "bg-primary/5 border-primary" : "bg-muted/50"
              } cursor-pointer hover:bg-muted`}
            >
              <RadioGroupItem value="flexible" id="flexible" className="sr-only" />
              <span>I'm flexible</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <Label>Where do you need it done?</Label>
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer ${
                formData.location === "on_site" ? "bg-primary/5 border-primary" : "bg-muted/50"
              }`}
              onClick={() => handleLocationChange("on_site")}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="font-medium">On Site</div>
              </div>
              <p className="text-sm text-muted-foreground">They need to show up at a place</p>
            </div>
            <div
              className={`border rounded-lg p-4 cursor-pointer ${
                formData.location === "remote" ? "bg-primary/5 border-primary" : "bg-muted/50"
              }`}
              onClick={() => handleLocationChange("remote")}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                </div>
                <div className="font-medium">Remote</div>
              </div>
              <p className="text-sm text-muted-foreground">They can do it from their home</p>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <div>
            <Label>Take a picture (Optional)</Label>
            <p className="text-sm text-muted-foreground">
              Help gig workers understand what needs to be done. Add up to 10 pictures
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Upload button */}
            <label className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-primary">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} multiple />
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-xs">Add Image</span>
              </div>
            </label>

            {/* Uploaded images */}
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative border rounded-lg aspect-square overflow-hidden group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">What is your budget for this gig</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="budget"
              name="budget"
              placeholder="e.g. NGN 20,000"
              value={formData.budget}
              onChange={handleInputChange}
              className={`pl-10 ${errors.budget ? "border-red-500" : ""}`}
            />
          </div>
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
        </div>

        {/* Required Skills */}
        <div className="space-y-4">
          <div>
            <Label>Required Skills</Label>
            <p className="text-sm text-muted-foreground">
              Add specific skills or expertise you're looking for in a gig worker.
            </p>
          </div>

          {/* Search skills */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search skills"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected skills */}
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skillId) => {
              const skill = availableSkills.find((s) => s.id === skillId)
              if (!skill) return null
              return <SkillBadge key={skill.id} name={skill.name} onRemove={() => handleSkillToggle(skill.id)} />
            })}
          </div>
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

          {/* Skill suggestions */}
          {searchSkill && (
            <div className="border rounded-lg p-2 space-y-1">
              {filteredSkills
                .filter((skill) => !selectedSkills.includes(skill.id))
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => {
                      handleSkillToggle(skill.id)
                      setSearchSkill("")
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <CustomButton 
          variant="outline" 
          className="flex-1 rounded-full"
          size="lg" 
          onClick={() => navigate(-1)}
          >
            Cancel
          </CustomButton>
          <CustomButton 
          className="flex-1 bg-black hover:bg-black/90 rounded-full"
          size="lg" 
          onClick={handleContinue}
          >
            Continue
          </CustomButton>
        </div>
      </div>

      {/* Preview Modal */}
      <GigPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onSubmit={handleSubmitGig}
        gigData={{
          title: formData.title || "[Gig title]",
          description: formData.description || "Lorem ipsum dolor sit amet...",
          deadline: "Before Mon, 22 April",
          location: formData.location === "remote" ? "Online" : "On Site",
          budget: formData.budget ? `NGN ${formData.budget}` : "NGN 20,000",
        }}
      />

      {/* Success Modal */}
      <GigSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinue={handleSuccessContinue}
      />

      {/* Error Modal */}
      <GigErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onFundWallet={handleFundWallet}
        onRetry={handleRetry}
      />
    </div>
  )
}

export default PostGigPage