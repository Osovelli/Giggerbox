import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import useUserStore from "@/store/userStore"
import { toast } from "sonner"

function Notification() {
  const { updateNotificationPreferences, user, loading } = useUserStore()
  const [notificationSettings, setNotificationSettings] = useState({
    gigUpdates: true,
    softwareUpdates: false,
    promotions: true,
    newFeatures: true,
    news: false,
  })
  /* const [notificationSettings, setNotificationSettings] = useState({
    jobSearchAlert: true,
    jobApplicationUpdate: true,
    jobsInterested: true,
    applicationReminders: true,
    jobSeekerUpdates: true,
    newFeatures: true,
    newPromotions: true,
  }) */

  // populate notification settings from user data when available
  useEffect(() => {
    console.log("Populating notification settings with user data:", user)
    if (user?.notificationPreferences) {
      setNotificationSettings((prev) => ({
        ...prev,
        ...user.notificationPreferences,
      }))
    }
  }, [user])

  const handleToggleChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = async () => {
    // console log the current notification settings
    console.log("Saving notification settings:", notificationSettings)

    try {
      const payload = {
        gigUpdates: notificationSettings.gigUpdates,
        softwareUpdates: notificationSettings.softwareUpdates,
        promotions: notificationSettings.promotions,
        newFeatures: notificationSettings.newFeatures,
        news: notificationSettings.news,
      }

      await updateNotificationPreferences(payload)
      toast.success("Notification preferences updated successfully")
    } catch (err) {
      console.error("Update notification preferences error:", err)
      const msg = err?.response?.data?.message || "Failed to update notification preferences"
      toast.error(msg)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Manage how you receive notifications.</p>
      </div>

      <div className="space-y-4">
        {/* Notification Settings */}

        <div className="space-y-4">
          {/* Gig Updates */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Gig Updates</p>
              <p className="text-sm text-muted-foreground">Get notified about new gigs and gig status changes</p>
            </div>
            <Switch
              checked={notificationSettings.gigUpdates}
              onCheckedChange={() => handleToggleChange("gigUpdates")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Software Updates */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Software Updates</p>
              <p className="text-sm text-muted-foreground">Receive notifications about platform updates and improvements</p>
            </div>
            <Switch
              checked={notificationSettings.softwareUpdates}
              onCheckedChange={() => handleToggleChange("softwareUpdates")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Promotions */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Promotions</p>
              <p className="text-sm text-muted-foreground">Get notified about special offers and promotions</p>
            </div>
            <Switch
              checked={notificationSettings.promotions}
              onCheckedChange={() => handleToggleChange("promotions")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* New Features */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">New Features</p>
              <p className="text-sm text-muted-foreground">Learn about new features and functionality</p>
            </div>
            <Switch
              checked={notificationSettings.newFeatures}
              onCheckedChange={() => handleToggleChange("newFeatures")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* News */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">News</p>
              <p className="text-sm text-muted-foreground">Receive news and updates from our platform</p>
            </div>
            <Switch
              checked={notificationSettings.news}
              onCheckedChange={() => handleToggleChange("news")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
        

        {/* <div className="space-y-4">
          
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Your Job Search Alert</p>
            <Switch
              checked={notificationSettings.jobSearchAlert}
              onCheckedChange={() => handleToggleChange("jobSearchAlert")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Application Update</p>
            <Switch
              checked={notificationSettings.jobApplicationUpdate}
              onCheckedChange={() => handleToggleChange("jobApplicationUpdate")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Jobs You May Be Interested In</p>
            <Switch
              checked={notificationSettings.jobsInterested}
              onCheckedChange={() => handleToggleChange("jobsInterested")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Application Reminders</p>
            <Switch
              checked={notificationSettings.applicationReminders}
              onCheckedChange={() => handleToggleChange("applicationReminders")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Seeker Updates</p>
            <Switch
              checked={notificationSettings.jobSeekerUpdates}
              onCheckedChange={() => handleToggleChange("jobSeekerUpdates")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div> */}
      </div>

      {/* Save Button */}
      <Button 
      className="w-full bg-black hover:bg-black/90 mt-8" 
      onClick={handleSave}
      disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  )
}

export default Notification