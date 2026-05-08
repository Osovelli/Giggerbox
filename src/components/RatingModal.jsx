import { useState } from "react"
import { Star, X, Send } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"


function RatingModal({ 
  isOpen, 
  onClose, 
  //type = "course",
  itemId,
  itemName,
  onSubmit,
  isLoading = false
}) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    if (review.trim().length === 0) {
      toast.error("Please write a review")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        CourseId: itemId,
        rating,
        comment: review.trim()
      })
      
      // Reset form
      setRating(0)
      setReview("")
      onClose()
    } catch (error) {
      console.error("Error submitting rating:", error)
      toast.error("Failed to submit rating. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0)
      setReview("")
      onClose()
    }
  }

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          {/* <h2 className="text-xl font-bold">Rate this {type}</h2> */}
          {/* <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <img
                className="h-40 w-40 object-cover mx-auto mb-4"
                src="/Hands Illustrations_42 1.png" 
                alt="hand illustration" 
                />
            </div>
          {/* Item Name */}
          {/* <div>
            <p className="text-sm text-gray-600 mb-2">You are rating:</p>
            <p className="font-semibold text-gray-900 truncate">{itemName}</p>
          </div> */}

          {/* Star Rating */}
          <div className="text-center">
            <label className="block text-xl font-semibold text-gray-700 mb-3">
              How was your experience?
            </label>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`h-10 w-10 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {rating} - {ratingLabels[rating]}
                </span>
              )}
            </div>
          </div>

          {/* Review Text Area */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
              Your feedback helps us improve and ensures quality for future learners.
            </label>
            <Textarea
              id="review"
              placeholder="Share your honest feedback about this course or gig... (minimum 10 characters)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={isSubmitting}
              className="resize-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              {review.length} / 1000 characters
            </p>
          </div>
          

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-2xl"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-2xl"
              disabled={isSubmitting || isLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting || isLoading ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RatingModal
