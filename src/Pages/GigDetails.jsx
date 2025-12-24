import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Calendar, Star, MapPin, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DashboardLayout from "@/components/Dashboard/DashboardLayout"
import useGigStore from "@/store/gigStore"

function GigDetails() {
  const navigate = useNavigate()
  const { getGigById, currentGig, loading, updateGig, deleteGig } = useGigStore()
  const [currentImage, setCurrentImage] = useState(0)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const location = window.location.pathname
  const gigId = location.split("/").pop()

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: 0,
    maxHires: 0,
    requiredSkills: [],
    image: "",
    attachments: []
  })
  const [skillInput, setSkillInput] = useState("")

  // Sample offers data (to be replaced when you have the actual API endpoint)
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
  ]

  useEffect(() => {
    // Fetch gig details by ID when component mounts
    console.log("Fetching gig details for ID:", gigId)
    getGigById(gigId)
  }, [gigId, getGigById])

  // Populate edit form when gig data is loaded
  useEffect(() => {
    if (gig && isPoster) {
      setEditForm({
        title: gig.title || "",
        description: gig.description || "",
        category: gig.category || "",
        location: gig.location || "",
        budget: gig.budget || 0,
        maxHires: gig.maxHires || 0,
        requiredSkills: gig.requiredSkills || [],
        image: gig.images?.[0] || "",
        attachments: gig.attachments?.map(a => a.url || a) || []
      })
    }
  }, [currentGig])

  // Transform API data to component format
  const gig = currentGig?.data?.gig
  
  // Determine if current user is the poster
  const isPoster = gig?.poster && Object.keys(gig.poster).length > 0
  
  const transformedGig = gig ? {
    title: gig.title,
    price: `${gig.currency} ${gig.budget?.toLocaleString()}`,
    tags: gig.requiredSkills || [],
    description: gig.description,
    status: gig.status === "open" ? "Online" : gig.status,
    deadline: gig.deadline || "No deadline set",
    images: gig.images?.length > 0 ? gig.images : ["/handshake.png"],
    location: gig.location || "Remote",
    category: gig.category,
    maxHires: gig.maxHires,
    applicantsCount: gig.applicantsCount || 0,
    attachments: gig.attachments || [],
    createdAt: gig.createdAt,
    poster: isPoster ? {
      name: `${gig.poster.firstname} ${gig.poster.lastname}`,
      email: gig.poster?.email,
      rating: gig.poster?.rating || 0,
      reviews: gig.poster?.reviews || 0,
      _id: gig.poster?._id,
    } : null,
  } : null

  // Format date for display
  const formatDeadline = (deadline) => {
    if (!deadline || deadline === "No deadline set") return deadline
    try {
      const date = new Date(deadline)
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'long' 
      })
    } catch (error) {
      return deadline
    }
  }

  // Format creation date
  const formatCreatedDate = (createdAt) => {
    if (!createdAt) return ""
    try {
      const date = new Date(createdAt)
      const now = new Date()
      const diffInMs = now - date
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      
      if (diffInDays === 0) return "Today"
      if (diffInDays === 1) return "Yesterday"
      if (diffInDays < 7) return `${diffInDays} days ago`
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch (error) {
      return ""
    }
  }

  // Handle gig application
  const handleApplyToGig = () => {
    console.log("Applying to gig with message:", applicationMessage)
    // TODO: Call API to submit application
    setIsApplyDialogOpen(false)
    setApplicationMessage("")
  }

  // Handle edit form changes
  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Add skill to the list
  const handleAddSkill = () => {
    if (skillInput.trim() && !editForm.requiredSkills.includes(skillInput.trim())) {
      setEditForm(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()]
      }))
      setSkillInput("")
    }
  }

  // Remove skill from the list
  const handleRemoveSkill = (skill) => {
    setEditForm(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }))
  }

  // Handle gig update
  const handleUpdateGig = async () => {
    try {
      await updateGig(gigId, editForm)
      setIsEditDialogOpen(false)
      // Refresh gig data
      getGigById(gigId)
    } catch (error) {
      console.error("Error updating gig:", error)
    }
  }

  // Handle gig deletion
  const handleDeleteGig = async () => {
    setIsDeleting(true)
    try {
      await deleteGig(gigId)
      // Navigate back to my creations page after successful deletion
      navigate("/dashboard/creations")
    } catch (error) {
      console.error("Error deleting gig:", error)
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading gig details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!transformedGig) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Gig not found</p>
            <Link to="/dashboard/gigs">
              <Button className="mt-4" variant="outline">
                Back to Gigs
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to={isPoster ? "/my-creations" : "/dashboard/gigs"} className="text-muted-foreground hover:text-foreground">
            {isPoster ? "My Creations" : "All Gigs"}
          </Link>
          <span className="text-muted-foreground">&gt;</span>
          <Link to="/gigs" className="text-muted-foreground hover:text-foreground">
            Gigs
          </Link>
          <span className="text-muted-foreground">&gt;</span>
          <span className="text-foreground">{transformedGig.title}</span>
        </div>

        {/* Image Carousel */}
        <div className="relative rounded-lg overflow-hidden mb-8 h-96 bg-gray-100">
          <img 
            src={transformedGig.images[currentImage] || "/handshake.png"} 
            alt={transformedGig.title} 
            className="w-full h-full object-cover" 
          />
          {transformedGig.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))}
                disabled={currentImage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white disabled:opacity-50"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => Math.min(prev + 1, transformedGig.images.length - 1))}
                disabled={currentImage === transformedGig.images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white disabled:opacity-50"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 rounded-full px-3 py-1 text-sm">
                {currentImage + 1}/{transformedGig.images.length}
              </div>
            </>
          )}
        </div>

        {/* Gig Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{transformedGig.title}</h1>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-xl font-semibold text-primary">{transformedGig.price}</span>
              <div className="flex gap-2 flex-wrap">
                {transformedGig.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="capitalize">{transformedGig.location}</span>
              </div>
              {transformedGig.category && (
                <Badge variant="outline">{transformedGig.category}</Badge>
              )}
              <span>Posted {formatCreatedDate(transformedGig.createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {isPoster ? (
              <>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Gig</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Gig</DialogTitle>
                      <DialogDescription>
                        Update the details of your gig posting.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={editForm.title}
                          onChange={(e) => handleEditFormChange("title", e.target.value)}
                          placeholder="Enter gig title"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={editForm.description}
                          onChange={(e) => handleEditFormChange("description", e.target.value)}
                          placeholder="Describe your gig requirements"
                          rows={4}
                        />
                      </div>

                      {/* Category and Location */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={editForm.category}
                            onChange={(e) => handleEditFormChange("category", e.target.value)}
                            placeholder="e.g., Design, Development"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => handleEditFormChange("location", e.target.value)}
                            placeholder="e.g., Remote, Lagos"
                          />
                        </div>
                      </div>

                      {/* Budget and Max Hires */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget (NGN)</Label>
                          <Input
                            id="budget"
                            type="number"
                            value={editForm.budget}
                            onChange={(e) => handleEditFormChange("budget", Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxHires">Max Hires</Label>
                          <Input
                            id="maxHires"
                            type="number"
                            value={editForm.maxHires}
                            onChange={(e) => handleEditFormChange("maxHires", Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <div className="flex gap-2">
                          <Input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                            placeholder="Add a skill and press Enter"
                          />
                          <Button type="button" onClick={handleAddSkill} variant="outline">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {editForm.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => handleRemoveSkill(skill)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Image URL */}
                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          value={editForm.image}
                          onChange={(e) => handleEditFormChange("image", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-black hover:bg-black/90"
                        onClick={handleUpdateGig}
                      >
                        Update Gig
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Close Gig</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to close this gig?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your gig posting
                        and remove all associated data. Any pending applications will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteGig}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDeleting ? "Deleting..." : "Yes, Close Gig"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-black/90">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Apply for Gig
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for this Gig</DialogTitle>
                    <DialogDescription>
                      Submit your application for "{transformedGig.title}". Explain why you're the best fit for this gig.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Message</label>
                      <Textarea
                        placeholder="Tell the poster why you're perfect for this gig..."
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        rows={6}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-black hover:bg-black/90"
                      onClick={handleApplyToGig}
                      disabled={!applicationMessage.trim()}
                    >
                      Submit Application
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gig Description */}
          <div className={isPoster ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Gig Description</h2>
                <p className="text-gray-600 mb-6 whitespace-pre-line">{transformedGig.description}</p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-2 h-2 rounded-full ${transformedGig.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="capitalize">{transformedGig.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDeadline(transformedGig.deadline)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Max Hires: {transformedGig.maxHires}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Applicants: {transformedGig.applicantsCount}
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {transformedGig.attachments?.length > 0 && (
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-semibold mb-4">Attachments</h2>
                  <div className="space-y-2">
                    {transformedGig.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        📎 {attachment.name || `Attachment ${index + 1}`}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Gig Poster Info - Show for both views */}
              {transformedGig.poster && (
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {isPoster ? "Your Profile" : "Gig Poster"}
                  </h2>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/avatar.jpeg" 
                      alt={transformedGig.poster.name} 
                      className="h-10 w-10 rounded-full" 
                    />
                    <div>
                      <h3 className="font-medium">{transformedGig.poster.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {transformedGig.poster.rating > 0 ? (
                          <>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{transformedGig.poster.rating}</span>
                            <span>({transformedGig.poster.reviews} reviews)</span>
                          </>
                        ) : (
                          <span>No reviews yet</span>
                        )}
                      </div>
                      {!isPoster && (
                        <div className="text-sm text-muted-foreground">{transformedGig.poster.email}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Offers - Only show for poster view */}
          {isPoster && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Offers ({offers.length})</h2>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <div key={offer.id} className="p-4 border-b last:border-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="items-center space-y-2">
                            <img 
                              src={offer.user.avatar || "/placeholder.svg"} 
                              alt={offer.user.name} 
                              className="h-10 w-10 rounded-full" 
                            />
                            <div>
                              <h3 className="font-medium">{offer.user.name}</h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <span className="flex gap-2 items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 
                                  {offer.user.rating}
                                </span>
                              </div>
                              <span className="text-green-600 text-sm">{offer.user.completionRate} Completion rate</span>
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
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No offers yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default GigDetails