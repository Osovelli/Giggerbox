import { Button } from "@/components/ui/button"
import { AppleIcon } from "lucide-react"
import { BiLogoApple, BiLogoPlayStore } from "react-icons/bi";
import CustomButton from "../CustomButton";
import { PlaystoreIcon } from "../Icons/PlaystoreIcon";

function HeroSection() {
  return (
    <section className="bg-[#F4F1FF] overflow-hidden">
      <div className="px-4 py-12 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Unlock Your Potential with Giggerz™
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Connect, Learn, and Grow with Expert-Led Courses and Flexible Gigs.
            </p>
            <div className="flex flex-wrap gap-4">
              <CustomButton
              variant='default'
              size="xl" 
              className="bg-black text-white p-5 hover:bg-black/80 rounded-full"
              >
                Get Started for Free
              </CustomButton>
              <CustomButton 
                size="xl" 
                variant="outline" 
                className="gap-2 rounded-full p-5"
              >
                <span className="flex">
                  <BiLogoApple className="h-12 w-12" />
                  <PlaystoreIcon className="h-12 w-12" />
                </span>
                Download App
              </CustomButton>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-[#E5DEFF] rounded-3xl transform rotate-2"></div>

              {/* Profile Images */}
              <img
                src="Frame 1.png"
                alt="Giggerz Community"
                className="relative z-10 w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E5DEFF] rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#E5DEFF] rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

