import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function GigErrorModal({ isOpen, onClose, onFundWallet, onRetry }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 flex flex-col items-center text-center">
        {/* Error Illustration */}
        <div className="mb-4">
          <img
            src="/Thumbs_down.png"
            alt="Error"
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-xl font-bold mb-2">Gig Not Posted</h2>
        <p className="text-gray-600 mb-6">
          Your gig couldn't be posted because your wallet balance is too low. Please add funds to proceed.
        </p>

        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1" onClick={onFundWallet}>
            Fund wallet
          </Button>
          <Button className="flex-1 bg-black hover:bg-black/90" onClick={onRetry}>
            Retry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GigErrorModal

