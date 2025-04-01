import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, MapPin, DollarSign, AlertCircle } from "lucide-react"

function GigPreviewModal({ isOpen, onClose, onSubmit, gigData }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Ready to get offers?</h2>
            <p className="text-sm text-muted-foreground">Post the gig when you are ready</p>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{gigData.title}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{gigData.description}</p>
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{gigData.deadline}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{gigData.location}</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{gigData.budget}</p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">
                The gig amount ({gigData.budget}) will be deducted from your wallet once the gig is posted. Please
                ensure your wallet has sufficient balance to proceed.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 bg-black hover:bg-black/90" onClick={onSubmit}>
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GigPreviewModal