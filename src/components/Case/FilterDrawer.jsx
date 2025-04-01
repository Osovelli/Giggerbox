import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Sample categories for gigs
const gigCategories = [
  { id: "UX Design", label: "UX Design" },
  { id: "Graphics Design", label: "Graphics Design" },
  { id: "Product Design", label: "Product Design" },
  { id: "Web Development", label: "Web Development" },
  { id: "Frontend", label: "Frontend" },
  { id: "React", label: "React" },
  { id: "Mobile", label: "Mobile" },
  { id: "Logo Design", label: "Logo Design" },
  { id: "Branding", label: "Branding" },
  { id: "Content Writing", label: "Content Writing" },
  { id: "SEO", label: "SEO" },
  { id: "Copywriting", label: "Copywriting" },
]

// Sample course types
const courseTypes = [
  { id: "Self-paced", label: "Self-paced" },
  { id: "1-on-1", label: "1-on-1" },
]

function FilterDrawer({ isOpen, onClose, filters, onApply, activeView }) {
  const [localFilters, setLocalFilters] = useState(filters)

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleApply = () => {
    onApply(localFilters)
  }

  const handleReset = () => {
    setLocalFilters({
      dateRange: null,
      priceRange: { min: "", max: "" },
      categories: [],
      types: [],
    })
  }

  const handleDateRangeChange = (value) => {
    setLocalFilters((prev) => ({
      ...prev,
      dateRange: value === prev.dateRange ? null : value,
    }))
  }

  const handlePriceRangeChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value,
      },
    }))
  }

  const handleCategoryToggle = (category) => {
    setLocalFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return {
        ...prev,
        categories,
      }
    })
  }

  const handleTypeToggle = (type) => {
    setLocalFilters((prev) => {
      const types = prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type]

      return {
        ...prev,
        types,
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between mb-6">
          <SheetTitle>Filter</SheetTitle>
          {/* <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button> */}
        </SheetHeader>

        <div className="space-y-6">
          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Date Range</h3>
            <RadioGroup value={localFilters.dateRange || ""} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last7days" id="last7days" onClick={() => handleDateRangeChange("last7days")} />
                <Label htmlFor="last7days">Last 7 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="last30days"
                  id="last30days"
                  onClick={() => handleDateRangeChange("last30days")}
                />
                <Label htmlFor="last30days">Last 30 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="last90days"
                  id="last90days"
                  onClick={() => handleDateRangeChange("last90days")}
                />
                <Label htmlFor="last90days">Last 90 days</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price Range (only for gigs) */}
          {activeView === "gigs" && (
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    type="number"
                    placeholder="Min"
                    className="pl-7"
                    value={localFilters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                  />
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="pl-7"
                    value={localFilters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Categories (for gigs) */}
          {activeView === "gigs" && (
            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {gigCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={localFilters.categories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Types (for courses) */}
          {activeView === "courses" && (
            <div className="space-y-4">
              <h3 className="font-medium">Course Type</h3>
              <div className="space-y-2">
                {courseTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={localFilters.types.includes(type.id)}
                      onCheckedChange={() => handleTypeToggle(type.id)}
                    />
                    <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              Reset
            </Button>
            <Button className="flex-1 bg-black hover:bg-black/90" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default FilterDrawer