import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const timeSlots = [
  { label: "Available all day", value: "all" },
  { label: "12 AM", value: "00:00" },
  { label: "1 AM", value: "01:00" },
  { label: "2 AM", value: "02:00" },
  { label: "3 AM", value: "03:00" },
  { label: "4 AM", value: "04:00" },
  // Add more time slots as needed
]

function SetAvailability() {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [startDate, setStartDate] = useState()
  const [classTitle, setClassTitle] = useState("")
  const [availabilitySets, setAvailabilitySets] = useState([
    { id: 1, day: "", timeSlots: [], startDate: null, title: "" },
  ])

  const handleTimeSlotToggle = (timeSlot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot) ? prev.filter((slot) => slot !== timeSlot) : [...prev, timeSlot],
    )
  }

  const addMoreAvailability = () => {
    setAvailabilitySets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        day: "",
        timeSlots: [],
        startDate: null,
        title: "",
      },
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log({
      availabilitySets,
    })
    // Navigate to one-on-one preview page
    navigate("/dashboard/one-on-one-preview")
  }

  return (
    <div className="s-w-3xl mx-auto px-4 py-8">
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
          Choose the dates and times when you'll be available for 1-on-1 sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {availabilitySets.map((set, index) => (
          <div key={set.id}>
            {index > 0 && <Separator className="my-8" />}
            <div className="space-y-6">
              {/* Select Day */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select day</label>
                <Select
                  value={set.day}
                  onValueChange={(value) =>
                    setAvailabilitySets((prev) => prev.map((s) => (s.id === set.id ? { ...s, day: value } : s)))
                  }
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
                <label className="text-sm font-medium">Time slots/day (Kindly select multiple time slots)</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      className={cn(
                        "px-4 py-2 rounded-full border-2 text-sm transition-colors",
                        set.timeSlots.includes(slot.value)
                          ? "border-primary bg-primary/5"
                          : "border-input hover:border-primary",
                      )}
                      onClick={() =>
                        setAvailabilitySets((prev) =>
                          prev.map((s) =>
                            s.id === set.id
                              ? {
                                  ...s,
                                  timeSlots: s.timeSlots.includes(slot.value)
                                    ? s.timeSlots.filter((t) => t !== slot.value)
                                    : [...s.timeSlots, slot.value],
                                }
                              : s,
                          ),
                        )
                      }
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !set.startDate && "text-muted-foreground",
                      )}
                    >
                      {set.startDate ? format(set.startDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={set.startDate}
                      onSelect={(date) =>
                        setAvailabilitySets((prev) =>
                          prev.map((s) => (s.id === set.id ? { ...s, startDate: date } : s)),
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Class Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Title</label>
                <Input
                  placeholder="e.g. Basics of graphic design"
                  value={set.title}
                  onChange={(e) =>
                    setAvailabilitySets((prev) =>
                      prev.map((s) => (s.id === set.id ? { ...s, title: e.target.value } : s)),
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add More Button */}
        <Button type="button" variant="outline" className="w-full" onClick={addMoreAvailability}>
          <Plus className="h-4 w-4 mr-2" />
          Add more
        </Button>

        {/* Preview Button */}
        <Button type="submit" className="w-full bg-black hover:bg-black/90">
          Preview
        </Button>
      </form>
    </div>
  )
}

export default SetAvailability