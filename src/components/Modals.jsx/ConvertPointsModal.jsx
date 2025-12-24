import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ConfirmConversionModal from "./ConfirmConversionModal"
import useWalletStore from "@/store/walletStore"


function ConvertPointsModal({ isOpen, onClose, availablePoints = 100 }) {
  const { convertPointsToWallet, loading } = useWalletStore()
  const [points, setPoints] = useState("")
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // Conversion rate: 1 point = 10 NGN (example)
  const conversionRate = 10
  const estimatedAmount = points ? Number(points) * conversionRate : 0

  const handlePointsChange = (e) => {
    const value = e.target.value
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setPoints(value)
    }
  }

  const handleContinue = () => {
    if (Number(points) > 0 && Number(points) <= availablePoints) {
      setIsConfirmModalOpen(true)
    }
  }

  const handleConfirmationResult = (success) => {
    setIsConfirmModalOpen(false)
    onClose()
    // Additional logic if needed after confirmation
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Convert Points</h2>
            {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button> */}
          </div>

          <p className="text-gray-600 mb-6">
            Convert your points to money in your wallet. You currently have {availablePoints} points available.
          </p>

          <div className="space-y-6">
            {/* Points Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Points to Convert</label>
              <Input placeholder="Enter points" value={points} onChange={handlePointsChange} />
              <p className="text-sm text-gray-500">Available: {availablePoints} points</p>
            </div>

            {/* Estimated Amount */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Estimated Amount</p>
              <p className="text-xl font-bold">NGN {estimatedAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Conversion rate: 1 point = NGN {conversionRate}</p>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-black hover:bg-black/90"
              onClick={handleContinue}
              disabled={!points || Number(points) <= 0 || Number(points) > availablePoints}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Conversion Modal */}
      <ConfirmConversionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        points={Number(points)}
        amount={estimatedAmount}
        onResult={handleConfirmationResult}
      />
    </>
  )
}

export default ConvertPointsModal

