import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

function Notification() {
  const [notificationSettings, setNotificationSettings] = useState({
    jobSearchAlert: true,
    jobApplicationUpdate: true,
    jobsInterested: true,
    applicationReminders: true,
    jobSeekerUpdates: true,
    newFeatures: true,
    newPromotions: true,
  })

  const handleToggleChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    // Here you would typically send the notification settings to your backend
    console.log("Saving notification settings:", notificationSettings)
    // Show success message or redirect
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
          {/* Job Search Alert */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Your Job Search Alert</p>
            <Switch
              checked={notificationSettings.jobSearchAlert}
              onCheckedChange={() => handleToggleChange("jobSearchAlert")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Job Application Update */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Application Update</p>
            <Switch
              checked={notificationSettings.jobApplicationUpdate}
              onCheckedChange={() => handleToggleChange("jobApplicationUpdate")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Jobs You May Be Interested In */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Jobs You May Be Interested In</p>
            <Switch
              checked={notificationSettings.jobsInterested}
              onCheckedChange={() => handleToggleChange("jobsInterested")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Job Application Reminders */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Application Reminders</p>
            <Switch
              checked={notificationSettings.applicationReminders}
              onCheckedChange={() => handleToggleChange("applicationReminders")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* Job Seeker Updates */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">Job Seeker Updates</p>
            <Switch
              checked={notificationSettings.jobSeekerUpdates}
              onCheckedChange={() => handleToggleChange("jobSeekerUpdates")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* New Features */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">New Features</p>
            <Switch
              checked={notificationSettings.newFeatures}
              onCheckedChange={() => handleToggleChange("newFeatures")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          {/* New Promotions and Deals */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="font-medium">New Promotions and Deals</p>
            <Switch
              checked={notificationSettings.newPromotions}
              onCheckedChange={() => handleToggleChange("newPromotions")}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button className="w-full bg-black hover:bg-black/90 mt-8" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default Notification