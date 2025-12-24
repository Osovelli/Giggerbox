import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ConversionResultModal from "./ConversionResultModal"
import useWalletStore from "@/store/walletStore"

function ConfirmConversionModal({ isOpen, onClose, points, amount, onResult }) {
  const { convertPointsToWallet, loading } = useWalletStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [conversionSuccess, setConversionSuccess] = useState(false)

  const handleConfirm = () => {
    setIsProcessing(true)
    convertPointsToWallet({ points })
    onClose()
    setConversionSuccess(true)
    setIsProcessing(false)
    setIsResultModalOpen(true)

    // Simulate API call with a timeout
    /* setTimeout(() => {
      // For demo purposes, let's assume 90% success rate
      const success = Math.random() < 0.5
      setConversionSuccess(success)
      setIsProcessing(false)
      setIsResultModalOpen(true)
    }, 1500) */
  }

  const handleResultModalClose = () => {
    setIsResultModalOpen(false)
    onResult(conversionSuccess)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Confirm Conversion</h2>
            {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button> */}
          </div>

          <p className="text-gray-600 mb-6">Please review and confirm your points conversion.</p>

          <div className="space-y-6">
            {/* Conversion Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-lg font-bold">{points} Points</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="text-lg font-bold">NGN {amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Conversion Rate</span>
                  <span>1 Point = NGN 10</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Processing Fee</span>
                  <span>NGN 0.00</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button 
              className="flex-1 bg-black hover:bg-black/90" 
              onClick={handleConfirm} 
              disabled={loading && isProcessing}
              >
                {isProcessing && loading ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Modal */}
      <ConversionResultModal
        isOpen={isResultModalOpen}
        onClose={handleResultModalClose}
        success={conversionSuccess}
        points={points}
        amount={amount}
      />
    </>
  )
}

export default ConfirmConversionModal

