import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Star, MessageSquare } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Avatar } from "../components/ui/avatar"

// Sample gig data
const gigData = {
  id: 3,
  title: "Virtual Assistance for Data Entry and Scheduling Tasks",
  description:
    "Provide virtual assistance for data entry, scheduling, and administrative tasks. Manage calendars, organize meetings, and handle correspondence.",
  price: 120000,
  createdDays: 5,
  status: "ongoing",
  tags: ["Virtual Assistant", "Data Entry", "Administrative"],
  location: "Remote",
  deadline: "2023-04-22",
  applicants: 19,
}

// Sample offers data
const offersData = [
  {
    id: 1,
    userId: 101,
    name: "John Doe",
    rating: 3.6,
    reviews: 128,
    completionRate: 100,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus.",
        time: "1 hour ago",
        isReply: false,
      },
    ],
    status: "pending",
  },
  {
    id: 2,
    userId: 102,
    name: "John Doe",
    rating: 3.6,
    reviews: 128,
    completionRate: 100,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus.",
        time: "1 hour ago",
        isReply: false,
      },
    ],
    status: "pending",
  },
  {
    id: 3,
    userId: 103,
    name: "John Doe",
    rating: 3.6,
    reviews: 128,
    completionRate: 100,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus.",
        time: "1 hour ago",
        isReply: false,
      },
    ],
    status: "pending",
  },
  {
    id: 4,
    userId: 104,
    name: "John Doe",
    rating: 3.6,
    reviews: 128,
    completionRate: 100,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus.",
        time: "1 hour ago",
        isReply: false,
      },
    ],
    status: "pending",
  },
  {
    id: 5,
    userId: 105,
    name: "John Doe",
    rating: 3.6,
    reviews: 128,
    completionRate: 100,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus.",
        time: "1 hour ago",
        isReply: false,
      },
    ],
    status: "pending",
  },
]

function GigOffersPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("gig-details")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [expandedMessages, setExpandedMessages] = useState({})

  // Calculate pagination
  const totalPages = Math.ceil(offersData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOffers = offersData.slice(startIndex, startIndex + itemsPerPage)

  const handleAcceptOffer = (offerId) => {
    console.log("Accept offer:", offerId)
    // Implement accept offer logic
  }

  const handleReplyToOffer = (offerId) => {
    console.log("Reply to offer:", offerId)
    // Implement reply logic
  }

  const handleMarkAsComplete = (offerId) => {
    console.log("Mark as complete:", offerId)
    // Implement mark as complete logic
  }

  const toggleMessageExpand = (offerId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [offerId]: !prev[offerId],
    }))
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/dashboard/case")}>
          My Case
        </Button>
        <span className="text-muted-foreground">&gt;</span>
        <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/my-case")}>
          Gigs
        </Button>
        <span className="text-muted-foreground">&gt;</span>
        <span className="text-foreground truncate max-w-[200px]">{gigData.title}</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{gigData.title}</h1>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            NGN {gigData.price.toLocaleString()}
          </Badge>
          {gigData.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Location: {gigData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Deadline: Before {formatDate(gigData.deadline)}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="offers" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="gig-details">Gig details</TabsTrigger>
          <TabsTrigger value="offers">Offers ({gigData.applicants})</TabsTrigger>
        </TabsList>

        <TabsContent value="gig-details">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Gig Description</h2>
              <p className="text-gray-700">{gigData.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Gig Poster</h2>
              <div className="flex items-center gap-3">
                <Avatar>
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">AO</span>
                  </div>
                </Avatar>
                <div>
                  <div className="font-medium">Abayomi Olowu</div>
                  <div className="text-sm text-muted-foreground">abayomiolowu@giggerz.com</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">Status: Online</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">Created {gigData.createdDays} days ago</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <div className="space-y-6">
            {paginatedOffers.map((offer) => (
              <div key={offer.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">JD</span>
                      </div>
                    </Avatar>
                    <div>
                      <div className="font-medium">{offer.name}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {offer.rating} ({offer.reviews})
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">{offer.completionRate}% Completion rate</div>
                </div>

                {offer.messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className={`text-gray-700 ${expandedMessages[offer.id] ? "" : "line-clamp-3"}`}>
                      {message.text}
                    </div>
                    {message.text.length > 150 && (
                      <button className="text-sm text-primary mt-1" onClick={() => toggleMessageExpand(offer.id)}>
                        {expandedMessages[offer.id] ? "Less" : "More"}
                      </button>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-muted-foreground">{message.time}</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          onClick={() => handleReplyToOffer(offer.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end gap-2 mt-4">
                  {offer.status === "pending" ? (
                    <Button variant="outline" size="sm" onClick={() => handleAcceptOffer(offer.id)}>
                      Accept
                    </Button>
                  ) : offer.status === "accepted" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsComplete(offer.id)}
                      className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                    >
                      Mark as Complete
                    </Button>
                  ) : null}

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate(`/messages/${offer.userId}`)}
                    className="bg-black hover:bg-black/90"
                  >
                    Message
                  </Button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={currentPage === page ? "bg-primary" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GigOffersPage

