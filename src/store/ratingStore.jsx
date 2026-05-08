import { create } from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axiosInstance"
import { comment } from "postcss"

/**
 * Rating Store
 * Manages ratings and reviews for courses and gigs
 */
const useRatingStore = create((set, get) => ({
  // State
  courseRatings: {},
  gigRatings: {},
  loading: false,
  error: null,
  userRatings: [],

  // Submit a rating
  submitRating: async ({ courseId, rating, comment }) => {
    try {
      set({ loading: true, error: null })
      const response = await axiosInstance.post(`/course/review/${courseId}`, {
        rating,
        comment
      })
      toast.success(`Thank you for your ${rating}-star review!`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to submit rating"
      set({ error: errorMessage })
      toast.error(errorMessage)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Fetch ratings for a specific item
  fetchRatings: async ({ itemId, type }) => {
    try {
      set({ loading: true, error: null })

      const endpoint =
        type === "course"
          ? `/courses/${itemId}/ratings`
          : `/gigs/${itemId}/ratings`

      const response = await axiosInstance.get(endpoint)

      if (type === "course") {
        set((state) => ({
          courseRatings: {
            ...state.courseRatings,
            [itemId]: response.data
          }
        }))
      } else {
        set((state) => ({
          gigRatings: {
            ...state.gigRatings,
            [itemId]: response.data
          }
        }))
      }

      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch ratings"
      set({ error: errorMessage })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Get ratings for a specific item from store
  getRatings: ({ itemId, type }) => {
    const state = get()
    if (type === "course") {
      return state.courseRatings[itemId] || []
    }
    return state.gigRatings[itemId] || []
  },

  // Calculate average rating
  getAverageRating: ({ itemId, type }) => {
    const ratings = get().getRatings({ itemId, type })
    if (ratings.length === 0) return 0

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / ratings.length) * 10) / 10
  },

  // Delete a rating
  deleteRating: async ({ itemId, type, ratingId }) => {
    try {
      set({ loading: true, error: null })

      const endpoint =
        type === "course"
          ? `/courses/${itemId}/ratings/${ratingId}`
          : `/gigs/${itemId}/ratings/${ratingId}`

      await axiosInstance.delete(endpoint)

      // Update store
      if (type === "course") {
        set((state) => ({
          courseRatings: {
            ...state.courseRatings,
            [itemId]: state.courseRatings[itemId].filter((r) => r.id !== ratingId)
          },
          userRatings: state.userRatings.filter((r) => r.id !== ratingId)
        }))
      } else {
        set((state) => ({
          gigRatings: {
            ...state.gigRatings,
            [itemId]: state.gigRatings[itemId].filter((r) => r.id !== ratingId)
          },
          userRatings: state.userRatings.filter((r) => r.id !== ratingId)
        }))
      }

      toast.success("Rating deleted successfully")
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete rating"
      set({ error: errorMessage })
      toast.error(errorMessage)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Update a rating
  updateRating: async ({ itemId, type, ratingId, rating, review }) => {
    try {
      set({ loading: true, error: null })

      const endpoint =
        type === "course"
          ? `/courses/${itemId}/ratings/${ratingId}`
          : `/gigs/${itemId}/ratings/${ratingId}`

      const response = await axiosInstance.patch(endpoint, {
        rating,
        review
      })

      // Update store
      if (type === "course") {
        set((state) => ({
          courseRatings: {
            ...state.courseRatings,
            [itemId]: state.courseRatings[itemId].map((r) =>
              r.id === ratingId ? response.data : r
            )
          },
          userRatings: state.userRatings.map((r) =>
            r.id === ratingId ? response.data : r
          )
        }))
      } else {
        set((state) => ({
          gigRatings: {
            ...state.gigRatings,
            [itemId]: state.gigRatings[itemId].map((r) =>
              r.id === ratingId ? response.data : r
            )
          },
          userRatings: state.userRatings.map((r) =>
            r.id === ratingId ? response.data : r
          )
        }))
      }

      toast.success("Rating updated successfully")
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update rating"
      set({ error: errorMessage })
      toast.error(errorMessage)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Clear store
  clearRatings: () => {
    set({
      courseRatings: {},
      gigRatings: {},
      userRatings: [],
      error: null
    })
  }
}))

export default useRatingStore
