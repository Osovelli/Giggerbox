import DashboardLayout from "@/components/Dashboard/DashboardLayout"
import ExcitingGigs from "@/components/Overview/ExcitingGigs"
import GigCategories from "@/components/Overview/GigCategories"
import OngoingCourses from "@/components/Overview/OngoingCourses"
import PopularCourses from "@/components/Overview/PopularCourses"
import ReferralBanner from "@/components/Overview/ReferralBanner"


function Overview() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Greeting */}
        <h1 className="text-2xl font-semibold">Hi, [User]👋</h1>

        {/* Main Content and Sidebar Layout */}
        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <GigCategories />
            <ExcitingGigs />
            <ReferralBanner />
            <PopularCourses />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <OngoingCourses />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Overview

