import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

function CaseItem({ gig }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/gigs/${gig.id}`)
  }

  const handleEdit = () => {
    navigate(`/edit-gig/${gig.id}`)
  }

  const handleCancel = () => {
    // Implement cancel logic
    console.log("Cancel gig:", gig.id)
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-muted-foreground">Created {gig.createdDays} days ago</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            {gig.status === "ongoing" && (
              <DropdownMenuItem onClick={handleCancel} className="text-red-500">
                Cancel Gig
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <h3 className="text-xl font-semibold text-primary">{gig.title}</h3>
        </div>
        <p className="text-gray-600 line-clamp-2">{gig.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          NGN {gig.price.toLocaleString()}
        </Badge>
        {gig.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  )
}

export default CaseItem