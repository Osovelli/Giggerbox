import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const MessagesSheet = ({ isOpen, onClose, messages }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Messages</SheetTitle>
            {/* <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button> */}
          </div>
        </SheetHeader>

        <div className="overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="divide-y">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-4 p-6 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <img
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.userName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium">{message.userName}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                </div>
                {message.unread && <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MessagesSheet