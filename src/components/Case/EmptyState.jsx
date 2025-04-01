import { Button } from "@/components/ui/button"
import { FileSearch } from "lucide-react"

function EmptyState({ type, status, hasFilters, onClear }) {
  const getMessage = () => {
    if (hasFilters) {
      return {
        title: "No results found",
        description: "Try adjusting your search or filter criteria to find what you're looking for.",
        action: "Clear Filters",
      }
    }

    if (type === "gigs") {
      return status === "ongoing"
        ? {
            title: "No ongoing gigs",
            description: "You don't have any ongoing gigs at the moment. Browse available gigs to find work.",
            action: "Browse Gigs",
          }
        : {
            title: "No completed gigs",
            description: "You haven't completed any gigs yet. Complete your ongoing gigs to see them here.",
            action: "View Ongoing Gigs",
          }
    } else {
      return status === "ongoing"
        ? {
            title: "No ongoing courses",
            description:
              "You're not enrolled in any courses at the moment. Browse available courses to start learning.",
            action: "Browse Courses",
          }
        : {
            title: "No completed courses",
            description: "You haven't completed any courses yet. Complete your ongoing courses to see them here.",
            action: "View Ongoing Courses",
          }
    }
  }

  const message = getMessage()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FileSearch className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message.title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{message.description}</p>
      <Button onClick={hasFilters ? onClear : undefined}>{message.action}</Button>
    </div>
  )
}

export default EmptyState