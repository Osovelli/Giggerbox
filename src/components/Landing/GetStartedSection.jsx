import { Button } from "@/components/ui/button"
import { Apple, PlayCircle } from "lucide-react"
import CustomButton from "../CustomButton"
import { BiLogoApple } from "react-icons/bi"
import { PlaystoreIcon } from "../Icons/PlaystoreIcon"

function GetStartedSection() {
  return (
    <section className="relative sm:mx-6 rounded-xl bg-[#8B7FFF]/20 py-24 overflow-hidden">
      <div className="mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Ready to Get Started</h2>
            <p className="text-lg text-muted-foreground">
              Join Giggers today and take the first step towards your new journey.
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

          {/* Right Column with Floating Elements */}
          <div className="relative flex justify-center h-[450px]">
            {/* Main Image */}
            <img
              src="/GetStarted.png"
              alt="People collaborating"
              className="object-cover w-full max-w-[400px] h-auto rounded-2xl shadow-2xl"
            />

            {/* Floating Elements */}
            <div className="absolute top-1 sm:left-12 -left-5 bg-white rounded-xl p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏠 Amaka won a gig</span>
                </div>
                <div className="font-bold">N100,000</div>
                <div className="text-sm text-muted-foreground">Social Media Post</div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
              </div>
            </div>

            {/* John's Message */}
            <div className="absolute top-1/3 sm:left-12 -left-5 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="space-y-1">
                  <div className="font-medium">John</div>
                  <div className="text-sm">
                    Completed design for <span className="text-primary">NGN 40,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Abdullahi's Message */}
            <div className="absolute bottom-1/3 sm:left-12 -left-5 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="space-y-1">
                  <div className="font-medium">Abdullahi</div>
                  <div className="text-sm">
                    Drafted the caption for <span className="text-primary">NGN 320,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Notification */}
            <div className="absolute sm:bottom-10 bottom-5 sm:right-20 -right-5 bg-[#FF6B34] text-white rounded-xl p-4 shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span>💰 You received</span>
                </div>
                <div className="text-2xl font-bold">N50,000</div>
                <div className="text-sm opacity-90">Great work, Yemi!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStartedSection

