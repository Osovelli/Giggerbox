import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronRight, MapPin, Star, User } from "lucide-react"
import { Link } from "react-router-dom"

const ProfileSheet = ({ isOpen, onClose }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-transparent border-none ">
        <div className="h-full bg-white ">
          {/* Purple Header Section */}
          <div className="relative h-1/2">
            {/* Decorative Stars */}
            <div className="absolute inset-0  w-full flex items-center justify-center">
                <img src="/illustration.png" alt="header decoration" className="object-cover w-full h-full" />
            </div>

            <SheetHeader>
              <SheetTitle className="text-white text-2xl text-center">Gig Worker Profile</SheetTitle>
            </SheetHeader>
          </div>

          {/* Profile Content */}
          <div className="absolute top-4 left-0 right-0 bottom-0 p-8 space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img
                  src="/avatar.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Black Info Card */}
            <div className=" bg-black text-white rounded-3xl p-6 text-center">
              <h2 className="text-2xl font-semibold mb-3">Olowu Abayomi</h2>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg">3.5 (128)</span>
                <span className="text-green-400 ml-2">• 100% Completion rate</span>
              </div>

              <p className="text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                Pelle sit amet sapien fringilla, mattis ligula massa mi...
              </p>

              <div className="flex items-center justify-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Navigation Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Information and Work samples</h3>

              {/* Profile Information Link */}
              <Link
                to="/profile/information"
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 mb-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">Profile Information</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              {/* Work Samples Link */}
              <Link
                to="/profile/work-samples"
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">Work Samples</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProfileSheet

