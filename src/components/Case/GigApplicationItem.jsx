import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MoreHorizontal, Star, Calendar, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

function GigApplicationItem({ application }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/gigs/${application.gigId}`)
  }

  const handleWithdraw = () => {
    // Implement withdraw logic
    console.log("Withdraw application:", application.id)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusBadge = () => {
    switch (application.status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Accepted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>
      default:
        return <Badge>{application.status}</Badge>
    }
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-muted-foreground">Applied on {formatDate(application.appliedDate)}</div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewDetails}>View Gig Details</DropdownMenuItem>
              {application.status === "pending" && (
                <DropdownMenuItem onClick={handleWithdraw} className="text-red-500">
                  Withdraw Application
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-primary mb-1">{application.title}</h3>
        <p className="text-gray-600 line-clamp-2">{application.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          NGN {application.price.toLocaleString()}
        </Badge>
        {application.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Posted by: {application.poster.name}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="ml-1">
              {application.poster.rating} ({application.poster.reviews})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {formatDate(application.deadline)}</span>
        </div>
      </div>

      {application.usedPoints > 0 && (
        <div className="mb-4 p-2 bg-purple-50 rounded-md text-sm">
          <span className="font-medium text-purple-700">Applied with {application.usedPoints} points</span>
          <span className="text-purple-600"> - Your application is prioritized</span>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          variant={application.status === "accepted" ? "default" : "outline"}
          size="sm"
          onClick={handleViewDetails}
        >
          {application.status === "accepted" ? "Start Working" : "View Details"}
        </Button>
      </div>
    </div>
  )
}

export default GigApplicationItem