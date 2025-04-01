import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import WithdrawalResultModal from "./WithdrawalResultModal"

function WithdrawalConfirmationModal({ isOpen, onClose, amount, bankDetails, fee }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false)

  const handleConfirm = () => {
    setIsProcessing(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // For demo purposes, let's assume 90% success rate
      const success = Math.random() < 0.9
      setWithdrawalSuccess(success)
      setIsProcessing(false)
      setIsResultModalOpen(true)
    }, 2000)
  }

  const handleResultModalClose = () => {
    setIsResultModalOpen(false)
    onClose()
  }

  if (!bankDetails) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="bg-[#F5F5FF] p-6 relative">
            {/* <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button> */}

            {/* Wallet Illustration */}
            <div className="flex justify-center mb-4 pt-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fund%20wallet%20%286%29-SEL4KfPJcuTD7ZxQPTdONXKtHDa96i.png"
                alt="Wallet"
                className="w-32 h-32 object-contain"
              />
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">You are Withdrawing</p>
              <h2 className="text-2xl font-bold">N{amount.toLocaleString()}</h2>
            </div>

            <div className="flex justify-center items-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22V11" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M19 15L12 22L5 15"
                  stroke="#6366F1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-center text-gray-500 text-sm mb-2">To</p>

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-indigo-500">{bankDetails.accountName}</h3>
              <p className="text-gray-600 text-sm">
                {bankDetails.bankName} ({bankDetails.accountNumber})
              </p>
            </div>

            {/* Fee Information */}
            <div className="flex items-center justify-center gap-2 text-sm text-red-500 mb-6">
              <AlertCircle className="h-4 w-4" />
              <p>You'll be charged N{fee.toLocaleString()} for this transaction</p>
            </div>

            <Button className="w-full bg-black hover:bg-black/90" onClick={handleConfirm} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Confirm & Withdraw"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Modal */}
      <WithdrawalResultModal
        isOpen={isResultModalOpen}
        onClose={handleResultModalClose}
        success={withdrawalSuccess}
        amount={amount}
        bankDetails={bankDetails}
      />
    </>
  )
}

export default WithdrawalConfirmationModal