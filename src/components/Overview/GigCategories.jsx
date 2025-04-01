import { Building2, Headphones, Monitor, PenTool, FileText } from "lucide-react"

const categories = [
  {
    name: "Business Development",
    count: 45,
    icon: Building2,
    color: "bg-blue-100",
  },
  {
    name: "Customer Success",
    count: 12,
    icon: Headphones,
    color: "bg-purple-100",
  },
  {
    name: "Project Management",
    count: 45,
    icon: Monitor,
    color: "bg-cyan-100",
  },
  {
    name: "Graphic Design",
    count: 45,
    icon: PenTool,
    color: "bg-yellow-100",
  },
  {
    name: "Content Writing",
    count: 45,
    icon: FileText,
    color: "bg-green-100",
  },
]

function GigCategories() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gig Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.name} className={`${category.color} rounded-lg p-4 transition-transform hover:scale-105`}>
            <category.icon className="h-6 w-6 mb-2" />
            <h3 className="font-medium">{category.name}</h3>
            <span className="text-sm text-muted-foreground">({category.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GigCategories

