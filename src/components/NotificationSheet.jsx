import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Briefcase, MessageSquare } from "lucide-react"

const NotificationSheet = ({ isOpen, onClose, notifications }) => {
  // Group notifications by time period
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const { timePeriod } = notification
    if (!acc[timePeriod]) {
      acc[timePeriod] = []
    }
    acc[timePeriod].push(notification)
    return acc
  }, {})

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {/* <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button> */}
          </div>
        </SheetHeader>

        <div className="overflow-y-auto max-h-[calc(100vh-5rem)]">
          {Object.entries(groupedNotifications).map(([period, items]) => (
            <div key={period}>
              <div className="px-6 py-2 bg-muted/50">
                <h3 className="text-md font-medium">{period}</h3>
              </div>
              <div className="divide-y">
                {items.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-6 hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {notification.type === "gig" ? (
                        <Briefcase className="h-4 w-4" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 flex items-start justify-between gap-2">
                      <p className="text-sm">{notification.message}</p>
                      {notification.unread && <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationSheet