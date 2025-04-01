import HeroSection from "@/components/Landing/HeroSection"
import FeatureSection from "@/components/Landing/FeatureSection"
import ExcitingGigSection from "@/components/Landing/ExcitingGigsSection"
import CourseSection from "@/components/Landing/CoursesSection"
import TestimonialSection from "@/components/Landing/TestimonialSection"
import GetStartedSection from "@/components/Landing/GetStartedSection"



function LandingPage() {
    return (
      <div className="mx-auto px-4 py-8">
       <HeroSection />
       <FeatureSection />
       <ExcitingGigSection />
       <CourseSection />
       <TestimonialSection />
       <GetStartedSection />
      </div>
    )
  }
  
  export default LandingPage
  
  