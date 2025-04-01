import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function BankAccountSuccessModal({ isOpen, onClose }) {
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

        <h2 className="text-2xl font-bold mb-2">Successful</h2>
        <p className="text-gray-600 mb-6">You've successfully added a Bank account.</p>

        <Button className="w-full bg-black hover:bg-black/90" onClick={onClose}>
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default BankAccountSuccessModal