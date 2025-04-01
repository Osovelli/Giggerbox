import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/Dashboard/DashboardLayout"

function GigDetails() {
  const [currentImage, setCurrentImage] = useState(0)

  // Sample data
  const gig = {
    title: "Virtual Assistance for Data Entry and Scheduling Tasks",
    price: "NGN 120,000",
    tags: ["UX Design", "Graphics Design", "Product Design"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus.",
    status: "Online",
    deadline: "Before Mon, 22 April",
    images: ["/handshake.png"],
    poster: {
      name: "John Doe",
      rating: 4.5,
      reviews: 128,
    },
  }

  const offers = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/avatar.jpeg",
        rating: 4.5,
        completionRate: "100%",
      },
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tinc...",
      timestamp: "1 hour ago",
    },
    ...Array(6).fill(null).map((_, index) => ({
        id: index + 2,
        user: {
            name: "John Doe",
            avatar: "/avatar.jpeg",
            rating: 4.5,
            completionRate: "100%",
        },
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tinc...",
        timestamp: "1 hour ago",
    })),
    // Add more offers as needed
  ]

  return (
    <DashboardLayout>
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/my-creations" className="text-muted-foreground hover:text-foreground">
          My Creations
        </Link>
        <span className="text-muted-foreground">&gt;</span>
        <Link to="/gigs" className="text-muted-foreground hover:text-foreground">
          Gigs
        </Link>
        <span className="text-muted-foreground">&gt;</span>
        <span className="text-foreground">Virtual Assistance for Data Entry and Scheduling Tasks</span>
      </div>

      {/* Image Carousel */}
      <div className="relative rounded-lg overflow-hidden mb-8  bg-gray-100">
        <img src={gig?.images[currentImage] || "/handshake.png"} alt="" className="w-full h-full object-cover" />
        <button
          onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentImage((prev) => Math.min(prev + 1, gig.images.length - 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 rounded-full px-3 py-1 text-sm">
          {currentImage + 1}/{gig.images.length}
        </div>
      </div>

      {/* Gig Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{gig.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-semibold text-primary">{gig.price}</span>
            <div className="flex gap-2">
              {gig.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Gig</Button>
          <Button variant="destructive">Close Gig</Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Gig Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Gig Description</h2>
            <p className="text-gray-600 mb-6">{gig.description}</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                {gig.status}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {gig.deadline}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6 ">
            <h2 className="text-lg font-semibold mb-4">Gig Poster</h2>
            <div className="flex items-center gap-3">
              <img src="/avatar.jpeg" alt="" className="h-10 w-10 rounded-full" />
              <div>
                <h3 className="font-medium">{gig.poster.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>★ {gig.poster.rating}</span>
                  <span>({gig.poster.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Offers</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {offers.map((offer) => (
                <div key={offer.id} className="p-4 border-b last:border-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="items-center space-y-2">
                      <img src={offer.user.avatar || "/placeholder.svg"} alt="" className="h-10 w-10 rounded-full" />
                      <div>
                        <h3 className="font-medium">{offer.user.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span className="flex gap-2 items-center">
                            <Star className="h-4 w-4" color="yellow-400" fill="yellow" /> 
                            {offer.user.rating}
                          </span>
                        </div>
                          <span className="text-green-600">{offer.user.completionRate} Completion rate</span>
                      </div>
                      <Button className="bg-black hover:bg-black/90 w-full">Accept</Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{offer.message}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="text-primary hover:underline">More</button>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <button className="hover:text-foreground">Reply</button>
                      <span>•</span>
                      <span>{offer.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default GigDetails

