import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, X, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import toast from "react-hot-toast"

function AddCourseContent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "",
      description: "",
      videos: [],
      resources: [],
    },
  ])

  // Load course data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem('courseData')
    if (!savedData) {
      toast.error("Course data not found. Please start from the beginning.")
      navigate("/dashboard/create-course")
      return
    }
    setCourseData(JSON.parse(savedData))
  }, [navigate])

  const handleFileUpload = (sectionId, files) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const newVideos = Array.from(files).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            progress: 0,
            status: "uploading",
            file,
          }))
          return {
            ...section,
            videos: [...section.videos, ...newVideos],
          }
        }
        return section
      }),
    )

    // Simulate upload progress
    Array.from(files).forEach((file) => {
      simulateFileUpload(sectionId, file.name)
    })
  }

  const simulateFileUpload = (sectionId, fileName) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              videos: section.videos.map((video) => {
                if (video.name === fileName) {
                  return {
                    ...video,
                    progress,
                    status: progress === 100 ? "completed" : "uploading",
                  }
                }
                return video
              }),
            }
          }
          return section
        }),
      )

      if (progress === 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  const removeVideo = (sectionId, videoId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            videos: section.videos.filter((video) => video.id !== videoId),
          }
        }
        return section
      }),
    )
  }

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        description: "",
        videos: [],
        resources: [],
      },
    ])
  }

  const removeSection = (id) => {
    if (sections.length === 1) {
      toast.error("You must have at least one section")
      return
    }
    setSections((prev) => {
      const filteredSections = prev.filter((section) => section.id !== id)
      return filteredSections.map((section, index) => ({
        ...section,
        id: index + 1,
      }))
    })
  }

  const updateSection = (id, field, value) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === id) {
          return { ...section, [field]: value }
        }
        return section
      }),
    )
  }

  const validateSections = () => {
    for (const section of sections) {
      if (!section.title.trim()) {
        toast.error(`Section ${section.id} must have a title`)
        return false
      }
      if (!section.description.trim()) {
        toast.error(`Section ${section.id} must have a description`)
        return false
      }
      /* if (section.videos.length === 0) {
        toast.error(`Section ${section.id} must have at least one video`)
        return false
      } */
      // Check if all videos are uploaded
      const hasUploadingVideos = section.videos.some(v => v.status === "uploading")
      if (hasUploadingVideos) {
        toast.error("Please wait for all videos to finish uploading")
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateSections()) {
      return
    }

    try {
      setLoading(true)

      // Transform sections into lessons format
      const lessons = sections.map(section => ({
        title: section.title,
        description: section.description,
        videos: section.videos.map(v => v.name), // In real app, upload and get URLs
        resources: section.resources || [],
        availableTimes: [], // For self-paced, this is empty
      }))

      // Update courseData with lessons
      const updatedCourseData = {
        ...courseData,
        lessons,
      }

      // Save to sessionStorage
      sessionStorage.setItem('courseData', JSON.stringify(updatedCourseData))

      toast.success("Course content saved!")
      
      // Navigate to preview
      navigate("/dashboard/course-preview")
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Failed to save course content")
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i]
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-semibold mb-2">Add Course Content</h1>
        <p className="text-muted-foreground">
          Upload videos and organize them into sections for <strong>{courseData.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-6 relative p-6 border rounded-lg">
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSection(section.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              SECTION {section.id}
            </div>

            {/* Section Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Title <span className="text-red-500">*</span>
              </label>
              <CustomInput
                placeholder="e.g. Introduction to Graphic Design"
                value={section.title}
                onChange={(e) => updateSection(section.id, "title", e.target.value)}
              />
            </div>

            {/* Video Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Learn the basics of graphic design, from tools to techniques."
                value={section.description}
                onChange={(e) => updateSection(section.id, "description", e.target.value)}
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium">
                Videos <span className="text-red-500">*</span>
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById(`video-upload-${section.id}`).click()}
              >
                <input
                  type="file"
                  id={`video-upload-${section.id}`}
                  className="hidden"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileUpload(section.id, e.target.files)}
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Upload videos</span>
                    <p className="text-xs">MP4, MOV formats, up to 100 MB</p>
                  </div>
                  <CustomButton type="button" variant="outline" size="sm">
                    Browse Files
                  </CustomButton>
                </div>
              </div>

              {/* Uploaded Videos List */}
              {section.videos.length > 0 && (
                <div className="space-y-3">
                  {section.videos.map((video) => (
                    <div
                      key={video.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        video.status === "error" ? "bg-red-50 border-red-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">{video.name}</p>
                          <button
                            type="button"
                            onClick={() => removeVideo(section.id, video.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {video.status === "error" ? (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Upload failed. Please try again</span>
                          </div>
                        ) : (
                          <>
                            <Progress value={video.progress} className="h-1 mb-1" />
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{video.status === "completed" ? "Upload complete" : "Uploading..."}</span>
                              <span>{formatFileSize(video.size)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <CustomButton 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={addSection}
          disabled={loading}
        >
          Add more section
        </CustomButton>

        {/* Preview Button */}
        <CustomButton
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Preview Course"
          )}
        </CustomButton>
      </form>
    </div>
  )
}

export default AddCourseContent