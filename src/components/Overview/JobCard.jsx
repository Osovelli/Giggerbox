import { Star } from "lucide-react"

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg p-4 border hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{job.postedTime}</p>
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{job.company}</span>
          <span>•</span>
          <span>{job.location}</span>
        </div>
        <p className="font-medium">NGN {job.salary.toLocaleString()}</p>
        <div className="flex items-center gap-2">
          <img src={job.profileImage || "/placeholder.svg"} alt={job.profileName} className="w-8 h-8 rounded-full" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{job.profileName}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">{job.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard

