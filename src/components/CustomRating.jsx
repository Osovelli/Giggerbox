import React, { useState } from "react"
import { Star } from "lucide-react"


const CustomRating = React.forwardRef(
  (
    {
      value = 0,
      onChange,
      readOnly = false,
      size = "md",
      showLabel = false,
      className = ""
    },
    ref
  ) => {
    const [hoverRating, setHoverRating] = useState(0)

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8"
    }

    const ratingLabels = {
      0: "No rating",
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    }

    const handleClick = (rating) => {
      if (!readOnly && onChange) {
        onChange(rating)
      }
    }

    const handleMouseEnter = (rating) => {
      if (!readOnly) {
        setHoverRating(rating)
      }
    }

    const handleMouseLeave = () => {
      if (!readOnly) {
        setHoverRating(0)
      }
    }

    const displayRating = hoverRating || value

    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 ${readOnly ? "" : "cursor-pointer"} ${className}`}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={readOnly}
              className={`transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded ${
                readOnly ? "" : "hover:scale-110"
              } disabled:cursor-default`}
            >
              <Star
                className={`${sizeClasses[size]} transition-colors ${
                  star <= displayRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {showLabel && (
          <span className="text-sm font-medium text-gray-700 ml-2">
            {displayRating > 0 ? `${displayRating} - ${ratingLabels[displayRating]}` : ""}
          </span>
        )}
      </div>
    )
  }
)

CustomRating.displayName = "CustomRating"

export default CustomRating
