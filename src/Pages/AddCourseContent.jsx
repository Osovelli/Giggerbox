import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"

function AddCourseContent() {
  const navigate = useNavigate()
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "",
      description: "",
      videos: [],
    },
  ])

  const handleFileUpload = (sectionId, files) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const newVideos = Array.from(files).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            progress: 0,
            status: "uploading", // uploading, completed, error
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
      },
    ])
  }

  const removeSection = (id) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log(sections)
    // Navigate to preview or publish page
    navigate("/dashboard/course-preview")
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i]
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
          Upload videos and organize them into sections to create a structured learning experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-6 relative">
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSection(section.id)}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center gap-2 text-sm font-medium text-primary">SECTION {section.id}</div>

            {/* Section Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Section Title</label>
              <CustomInput
                placeholder="e.g. Introduction to Graphic Design"
                value={section.title}
                onChange={(e) => updateSection(section.id, "title", e.target.value)}
              />
            </div>

            {/* Video Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Video Description</label>
              <Textarea
                placeholder="Learn the basics of graphic design, from tools to techniques."
                value={section.description}
                onChange={(e) => updateSection(section.id, "description", e.target.value)}
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById(`video-upload-${section.id}`).click()}
              >
                <CustomInput
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
        >
          Add more section
        </CustomButton>

        {/* Preview Button */}
        <CustomButton
         type="submit" 
         className="w-full bg-black hover:bg-black/90"
         onClick={() => navigate("/dashboard/course-preview")}
         >
          Preview
        </CustomButton>
      </form>
    </div>
  )
}

export default AddCourseContent

