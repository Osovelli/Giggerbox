import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MoreHorizontal, Users, MapPin, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

function GigPosterItem({ gig }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/gigs/${gig.id}`)
  }

  const handleEdit = () => {
    navigate(`/edit-gig/${gig.id}`)
  }

  const handleViewApplicants = () => {
    navigate(`/dashboard/gigs/${gig.id}/offers`)
  }

  const handleCancel = () => {
    // Implement cancel logic
    console.log("Cancel gig:", gig.id)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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
              <DropdownMenuItem onClick={handleViewApplicants}>View Offers</DropdownMenuItem>
            )}
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

      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{gig.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Before {formatDate(gig.deadline)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {gig.applicants} offer{gig.applicants !== 1 ? "s" : ""}
          </span>
        </div>

        <Button
          variant={gig.applicants > 0 ? "default" : "outline"}
          size="sm"
          onClick={handleViewApplicants}
          className={gig.applicants > 0 ? "bg-black hover:bg-black/90" : ""}
        >
          {gig.applicants > 0 ? "View Offers" : "No Offers Yet"}
        </Button>
      </div>
    </div>
  )
}

export default GigPosterItem

