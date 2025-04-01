import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"
import { useState } from "react"

const courseCategories = [
  { id: "analyst", label: "Analyst", count: 39 },
  { id: "backend", label: "Backend Developer", count: 39 },
  { id: "business", label: "Business Development", count: 39 },
  { id: "marketing", label: "Marketing & Communication", count: 39 },
]

const startDateOptions = [
  { id: "anytime", label: "Anytime" },
  { id: "24h", label: "Starting in 24 hours" },
  { id: "week", label: "Starting in a Week" },
  { id: "1month", label: "Starting in 1 Month" },
  { id: "3month", label: "Starting in 3 Month" },
]

const FilterSheet = ({ isOpen, onClose, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedRating, setSelectedRating] = useState(0)
  const [courseType, setCourseType] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [startDate, setStartDate] = useState("anytime")

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      rating: selectedRating,
      courseType,
      categories: selectedCategories,
      startDate,
    })
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between mb-6">
          <SheetTitle>Filter</SheetTitle>
          {/* <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button> */}
        </SheetHeader>

        <div className="space-y-8">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Price</h3>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  placeholder="0"
                  className="pl-7"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  placeholder="1,000,000"
                  className="pl-7"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="font-medium">Rating</h3>
            <div className="flex gap-8">
              {[0, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex">
                    <Star
                      className={`h-5 w-5 ${
                        selectedRating === rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{rating === 0 ? "Any" : `${rating} Star`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Course Type */}
          <div className="space-y-4">
            <h3 className="font-medium">Course type</h3>
            <RadioGroup value={courseType} onValueChange={setCourseType}>
              <div className="flex gap-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-on-1" id="1-on-1" />
                  <label htmlFor="1-on-1" className="text-sm">
                    1-On-1
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self-paced" id="self-paced" />
                  <label htmlFor="self-paced" className="text-sm">
                    Self Paced
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Course Category */}
          <div className="space-y-4">
            <h3 className="font-medium">Course category</h3>
            <div className="space-y-3">
              {courseCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, category.id]
                          : selectedCategories.filter((id) => id !== category.id),
                      )
                    }}
                  />
                  <label htmlFor={category.id} className="flex-1 text-sm flex items-center justify-between">
                    {category.label}
                    <span className="text-muted-foreground">({category.count})</span>
                  </label>
                </div>
              ))}
              <Button variant="link" className="text-primary p-0 h-auto">
                See All
              </Button>
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-4">
            <h3 className="font-medium">Start date</h3>
            <div className="flex flex-wrap gap-2">
              {startDateOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={startDate === option.id ? "default" : "outline"}
                  className={startDate === option.id ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setStartDate(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button className="w-full bg-black hover:bg-black/90" onClick={handleApplyFilters}>
            Apply filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default FilterSheet