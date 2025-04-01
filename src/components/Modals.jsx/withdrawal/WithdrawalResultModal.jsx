import { CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function WithdrawalResultModal({ isOpen, onClose, success, amount, bankDetails }) {
  if (!bankDetails) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          {success ? (
            <>
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Withdrawal Successful</h2>
              <p className="text-gray-600 mb-6">
                Your withdrawal of N{amount.toLocaleString()} to {bankDetails.accountName} ({bankDetails.accountNumber})
                has been processed successfully.
              </p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Withdrawal Failed</h2>
              <p className="text-gray-600 mb-6">
                We couldn't process your withdrawal at this time. Please try again later or contact support if the
                problem persists.
              </p>
            </>
          )}

          <Button className="w-full bg-black hover:bg-black/90" onClick={onClose}>
            {success ? "Done" : "Try Again"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawalResultModal

