import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Generate time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      const displayMinute = minute.toString().padStart(2, '0')
      const timeValue = `${hour.toString().padStart(2, '0')}:${displayMinute}`
      const timeLabel = `${displayHour}:${displayMinute} ${period}`
      slots.push({ label: timeLabel, value: timeValue })
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

function SetAvailability() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: 1, day: "", times: [] },
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

  const addMoreAvailability = () => {
    setAvailabilitySlots((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        day: "",
        times: [],
      },
    ])
  }

  const removeAvailability = (id) => {
    if (availabilitySlots.length === 1) {
      toast.error("You must have at least one availability slot")
      return
    }
    setAvailabilitySlots((prev) => {
      const filtered = prev.filter((slot) => slot.id !== id)
      return filtered.map((slot, index) => ({ ...slot, id: index + 1 }))
    })
  }

  const updateDay = (id, day) => {
    setAvailabilitySlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, day } : slot))
    )
  }

  const toggleTime = (id, time) => {
    setAvailabilitySlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const times = slot.times.includes(time)
            ? slot.times.filter((t) => t !== time)
            : [...slot.times, time]
          return { ...slot, times: times.sort() }
        }
        return slot
      })
    )
  }

  const validateAvailability = () => {
    for (const slot of availabilitySlots) {
      if (!slot.day) {
        toast.error(`Please select a day for slot ${slot.id}`)
        return false
      }
      if (slot.times.length === 0) {
        toast.error(`Please select at least one time for ${slot.day}`)
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateAvailability()) {
      return
    }

    try {
      setLoading(true)

      // Transform availability data to match API format
      const availableTimes = availabilitySlots.map(slot => ({
        day: slot.day.toLowerCase(),
        times: slot.times,
      }))

      // Update courseData with availability
      const updatedCourseData = {
        ...courseData,
        availableTimes,
        lessons: [], // One-on-one courses don't have pre-recorded lessons
      }

      // Save to sessionStorage
      sessionStorage.setItem('courseData', JSON.stringify(updatedCourseData))

      toast.success("Availability set successfully!")
      
      // Navigate to one-on-one preview
      navigate("/dashboard/one-on-one-preview")
    } catch (error) {
      console.error("Error saving availability:", error)
      toast.error("Failed to save availability")
    } finally {
      setLoading(false)
    }
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
        <h1 className="text-2xl font-semibold mb-2">Set Your Availability</h1>
        <p className="text-muted-foreground">
          Choose the days and times when you'll be available for <strong>{courseData.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {availabilitySlots.map((slot, index) => (
          <div key={slot.id}>
            {index > 0 && <Separator className="my-8" />}
            <div className="space-y-6 relative p-6 border rounded-lg">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAvailability(slot.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Select Day */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select day <span className="text-red-500">*</span>
                </label>
                <Select
                  value={slot.day}
                  onValueChange={(value) => updateDay(slot.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Available times <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">Select multiple time slots when you're available</p>
                <div className="max-h-[300px] overflow-y-auto border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          slot.times.includes(time.value)
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => toggleTime(slot.id, time.value)}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>
                {slot.times.length > 0 && (
                  <p className="text-xs text-primary">
                    {slot.times.length} time slot{slot.times.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add More Button */}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={addMoreAvailability}
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add more day
        </Button>

        {/* Preview Button */}
        <Button 
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
        </Button>
      </form>
    </div>
  )
}

export default SetAvailability