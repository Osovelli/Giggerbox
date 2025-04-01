import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const courseCategories = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "business", label: "Business" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
]

function CreateCourse() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "self-paced", // or "1-on-1"
    price: "",
    isFree: false,
    thumbnail: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log(formData)
    // Navigate based on course type
    if (formData.type === "1-on-1") {
      navigate("/dashboard/set-availability")
    } else {
      navigate("/dashboard/add-course-content")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
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
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Basics of graphic design"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Learn the basics of graphic design, from tools to techniques."
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Course Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Course Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger id="category">
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
        </div>

        {/* Course Type */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`p-4 rounded-lg border-2 text-center ${
              formData.type === "1-on-1" ? "border-primary bg-primary/5" : "border-input"
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, type: "1-on-1" }))}
          >
            1-On-1
          </button>
          <button
            type="button"
            className={`p-4 rounded-lg border-2 text-center ${
              formData.type === "self-paced" ? "border-primary bg-primary/5" : "border-input"
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, type: "self-paced" }))}
          >
            Self Paced
          </button>
        </div>

        {/* Price */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Price</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="free" className="text-sm">
                Free
              </Label>
              <Switch
                id="free"
                checked={formData.isFree}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFree: checked }))}
              />
            </div>
          </div>
          <Input
            id="price"
            name="price"
            placeholder="e.g 5000"
            value={formData.price}
            onChange={handleInputChange}
            disabled={formData.isFree}
          />
        </div>

        {/* Thumbnail Image */}
        <div className="space-y-2">
          <Label>Thumbnail Image</Label>
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => document.getElementById("thumbnail").click()}
          >
            <input type="file" id="thumbnail" className="hidden" accept="image/*" onChange={handleFileChange} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                {formData.thumbnail ? <span>{formData.thumbnail.name}</span> : <span>Upload File</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-black hover:bg-black/90">
          Continue
        </Button>
      </form>
    </div>
  )
}

export default CreateCourse