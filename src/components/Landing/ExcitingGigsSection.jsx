import { useState } from "react"
import { Button } from "@/components/ui/button"
import JobCard from "./JobCard"
import CustomButton from "../CustomButton"

// Sample data
const initialJobs = [
  {
    id: 1,
    postedTime: "2 days ago",
    title: "Product Designer",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    profileName: "John Doe",
    profileImage: "/avatar 10.png",
    rating: 4.5,
  },
  {
    id: 2,
    postedTime: "2 days ago",
    title: "Design Company Profile",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    profileName: "John Doe",
    profileImage: "/avatar 10.png",
    rating: 4.5,
  },
  ...Array(3).fill(null).map((_, index) => ({
    id: 3,
    postedTime: "2 days ago",
    title: "UI/UX Designer & Project Manager",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    profileName: "John Doe",
    profileImage: "/avatar 10.png",
    rating: 4.5,
  })),
  ...Array(4).fill(null).map((_, index) => ({
    id: (4 + index),
    postedTime: "2 days ago",
    title: "Product Designer",
    company: "Microsoft",
    location: "Lagos",
    salary: 120000,
    profileName: "John Doe",
    profileImage: "/avatar 10.png",
    rating: 4.5,
  })),
]

function ExcitingGigSection() {
  const [showAll, setShowAll] = useState(false)
  const [jobs] = useState(initialJobs)

  const displayedJobs = showAll ? jobs : jobs.slice(0, 8)

  return (
    <section className="py-16">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Exciting Gigs Opportunities</h2>
          {initialJobs.length > 8 &&
          <CustomButton 
          variant="ghost" 
          onClick={() => setShowAll(!showAll)} className="text-primary hover:text-primary/90"
          >
            See All
          </CustomButton>
          }
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExcitingGigSection

