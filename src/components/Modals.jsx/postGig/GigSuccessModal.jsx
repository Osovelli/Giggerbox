import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function GigSuccessModal({ isOpen, onClose, onContinue }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 flex flex-col items-center text-center">
        {/* Success Illustration */}
        <div className="mb-4">
          <img
            src="/handclap.png"
            alt="Success"
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-xl font-bold mb-2">Gig Posted Successfully</h2>
        <p className="text-gray-600 mb-6">Great job! Your gig is posted. We'll notify you when professionals apply.</p>

        <Button className="w-full bg-black hover:bg-black/90" onClick={onContinue}>
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default GigSuccessModal

