"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const CourseSidebar = ({
  sections,
  currentSectionId,
  currentLessonId,
  onLessonSelect,
  videoProgress = 0,
  isPlaying = false,
  volume = 75,
  onPlayPause,
  onVolumeChange,
  onSeek,
}) => {
  const [expandedSections, setExpandedSections] = useState([currentSectionId])

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div className="w-full max-w-xs flex flex-col h-full bg-background border-l">
      {/* Video Controls */}
      <div className="p-4 border-b">
        <div className="space-y-4">
          {/* Progress Bar */}
          <Slider
            value={[videoProgress]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={([value]) => onSeek(value)}
          />

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onPlayPause} className="hover:bg-primary/10">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="w-24">
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={([value]) => onVolumeChange(value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className="border-b last:border-b-0">
            <button
              onClick={() => toggleSection(section.id)}
              className={cn(
                "flex items-center justify-between w-full p-4 text-left hover:bg-accent/50",
                expandedSections.includes(section.id) && "bg-accent/30",
              )}
            >
              <span className="text-sm font-medium text-primary">{section.title}</span>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="px-2 pb-2">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(section.id, lesson.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg text-left text-sm",
                      "hover:bg-accent/50 transition-colors",
                      currentSectionId === section.id &&
                        currentLessonId === lesson.id &&
                        "bg-primary text-primary-foreground",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lesson.id}.</span>
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-xs">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar