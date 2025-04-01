import { Link } from "react-router-dom"
import JobCard from "./JobCard"

const jobs = [
  {
    id: 1,
    title: "Product Designer",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    postedTime: "2 days ago",
    profileName: "John Doe",
    profileImage: "/avatar.jpeg",
    rating: "4.5 (128)",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    postedTime: "2 days ago",
    profileName: "John Doe",
    profileImage: "/avatar.jpeg",
    rating: "4.5 (128)",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    postedTime: "2 days ago",
    profileName: "John Doe",
    profileImage: "/avatar.jpeg",
    rating: "4.5 (128)",
  },
  // Add more jobs as needed
]

function ExcitingGigs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exciting Gigs Opportunities</h2>
        <Link to="/gigs" className="text-sm text-muted-foreground hover:text-primary">
          See All
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default ExcitingGigs