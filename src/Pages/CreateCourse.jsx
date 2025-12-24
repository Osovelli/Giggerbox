import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import useCourseStore from "@/store/courseStore"

const courseCategories = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "business", label: "Business" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
]

function CreateCourse() {
  const { createCourse, loading } = useCourseStore()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "self-paced", // "self-paced" or "one-on-one"
    price: "",
    duration: "",
    videoUrl: "",
    isFree: false,
    thumbnail: null,
    promo: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, thumbnail: "Please upload an image file" }))
        return
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, thumbnail: "Image size should be less than 5MB" }))
        return
      }
      setFormData((prev) => ({ ...prev, thumbnail: file }))
      setErrors((prev) => ({ ...prev, thumbnail: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Course description is required"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.isFree && (!formData.price || Number(formData.price) <= 0)) {
      newErrors.price = "Please enter a valid price"
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      newErrors.duration = "Please enter course duration in weeks"
    }

    if (formData.type === "self-paced" && !formData.videoUrl.trim()) {
      newErrors.videoUrl = "Video URL is required for self-paced courses"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    try {
      // Prepare payload according to API structure
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        price: formData.isFree ? 0 : Number(formData.price),
        duration: Number(formData.duration),
        videoUrl: formData.videoUrl.trim() || "",
        lessons: [], // Will be added in next step
        availableTimes: [], // Will be set in availability page for 1-on-1 courses
        promo: formData.promo?.trim() || null,
      }

      // If you need to upload thumbnail separately, do it here
      // For now, we'll include it in the payload if your API supports it
      if (formData.thumbnail) {
        // If your API requires FormData for file upload
        const formDataToSend = new FormData()
        Object.keys(payload).forEach(key => {
          if (payload[key] !== null && payload[key] !== undefined) {
            formDataToSend.append(key, 
              typeof payload[key] === 'object' ? JSON.stringify(payload[key]) : payload[key]
            )
          }
        })
        formDataToSend.append('thumbnail', formData.thumbnail)

        // Debug logging FormData entries
        console.log("FormData to be sent:", payload)
        
        // Call API with FormData
        //const result = await createCourse(formDataToSend)
        const result = await createCourse(payload)
        
        if (result) {
          toast.success("Course created successfully!")
          
          // Navigate based on course type
          if (formData.type === "one-on-one") {
            navigate("/dashboard/set-availability", { state: { courseId: result.data._id } })
          } else {
            navigate("/dashboard/add-course-content", { state: { courseId: result.data._id } })
          }
        }
      } else {
        // Call API without thumbnail
        const result = await createCourse(payload)
        
        if (result.success) {
          toast.success("Course created successfully!")
          
          // Navigate based on course type
          if (formData.type === "one-on-one") {
            navigate("/dashboard/set-availability", { state: { courseId: result.data._id } })
          } else {
            navigate("/dashboard/add-course-content", { state: { courseId: result.data._id } })
          }
        }
      }
    } catch (error) {
      console.error("Error creating course:", error)
      toast.error(error.message || "Failed to create course. Please try again.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
          disabled={loading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-semibold mb-2">Create a New Course</h1>
        <p className="text-muted-foreground">Provide details about your course to make it stand out.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Course Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Basics of graphic design"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Learn the basics of graphic design, from tools to techniques."
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Course Category */}
        <div className="space-y-2">
          <Label htmlFor="category">
            Course Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, category: value }))
              setErrors((prev) => ({ ...prev, category: "" }))
            }}
          >
            <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select course category" />
            </SelectTrigger>
            <SelectContent>
              {courseCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        {/* Course Type */}
        <div className="space-y-2">
          <Label>
            Course Type <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                formData.type === "one-on-one" ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, type: "one-on-one" }))}
            >
              <div className="font-medium">1-On-1</div>
              <div className="text-xs text-muted-foreground mt-1">Personalized sessions</div>
            </button>
            <button
              type="button"
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                formData.type === "self-paced" ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, type: "self-paced" }))}
            >
              <div className="font-medium">Self Paced</div>
              <div className="text-xs text-muted-foreground mt-1">Learn at your own speed</div>
            </button>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">
            Course Duration (in weeks) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            placeholder="e.g. 8"
            value={formData.duration}
            onChange={handleInputChange}
            min="1"
            className={errors.duration ? "border-red-500" : ""}
          />
          {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
        </div>

        {/* Video URL - Required for self-paced courses */}
        {formData.type === "self-paced" && (
          <div className="space-y-2">
            <Label htmlFor="videoUrl">
              Course Video URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              type="url"
              placeholder="https://example.com/video.mp4"
              value={formData.videoUrl}
              onChange={handleInputChange}
              className={errors.videoUrl ? "border-red-500" : ""}
            />
            {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl}</p>}
            <p className="text-xs text-muted-foreground">Enter a direct link to your course introduction video</p>
          </div>
        )}

        {/* Price */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">
              Price (NGN) {!formData.isFree && <span className="text-red-500">*</span>}
            </Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="free" className="text-sm">
                Free
              </Label>
              <Switch
                id="free"
                checked={formData.isFree}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({ ...prev, isFree: checked, price: checked ? "0" : "" }))
                  setErrors((prev) => ({ ...prev, price: "" }))
                }}
              />
            </div>
          </div>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g 5000"
            value={formData.price}
            onChange={handleInputChange}
            disabled={formData.isFree}
            min="0"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>

        {/* Promo Code (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code (Optional)</Label>
          <Input
            id="promo"
            name="promo"
            placeholder="e.g. LAUNCH2024"
            value={formData.promo}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">Add a promotional code for discounts</p>
        </div>

        {/* Thumbnail Image */}
        <div className="space-y-2">
          <Label>Thumbnail Image (Optional)</Label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors ${
              errors.thumbnail ? "border-red-500" : ""
            }`}
            onClick={() => document.getElementById("thumbnail").click()}
          >
            <input 
              type="file" 
              id="thumbnail" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={loading}
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                {formData.thumbnail ? (
                  <span className="text-primary">{formData.thumbnail.name}</span>
                ) : (
                  <span>Click to upload course thumbnail</span>
                )}
              </div>
              <div className="text-xs text-gray-400">PNG, JPG up to 5MB</div>
            </div>
          </div>
          {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail}</p>}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Course...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  )
}

export default CreateCourse