import { GraduationCap, Briefcase, MessageCircle } from "lucide-react"

function Features() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Diverse Learning Opportunities",
      description: "Access a wide range of courses tailored to your interests and career goals.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Flexible Gig Marketplace",
      description: "Find and post gigs that fit your schedule and expertise.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Community Support",
      description: "Join a vibrant community of learners and professionals.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Community Support",
      description: "Join a vibrant community of learners and professionals.",
    },
  ]
  
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Why Choose Giggerz?</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-16">
              {features.map((feature, index) => (
                <div key={index} className="space-y-4">
                  <div className="p-2 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

          {/* App Preview with Image Background */}
          <div className="relative ">
            {/* Background Image */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                backgroundImage: "url(Asset.png)", // You'll need to provide the actual background image
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* App Screenshot */}
            <div className="relative">
              <img
                src={`app screenshot.png`}
                alt="Giggerz App Interface"
                className="w-full h-auto rounded-2xl object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features