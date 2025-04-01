import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WithdrawalConfirmationModal from "./WithdrawalConfirmationModal"

function PayPalWithdrawModal({ isOpen, onClose, walletBalance }) {
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)

    // Clear error when user types
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }))
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)

    // Clear error when user types
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate amount
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (numAmount > walletBalance) {
      newErrors.amount = "Insufficient funds"
    }

    // Validate email
    if (!email) {
      newErrors.email = "Please enter your PayPal email"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    setIsConfirmationModalOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">PayPal</h2>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <p className="text-gray-600 mb-6">Withdraw directly to your PayPal account.</p>

            <div className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                <p className="text-sm text-gray-500">Balance: N{walletBalance.toLocaleString()}</p>
              </div>

              {/* PayPal Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">PayPal Email</label>
                <Input
                  placeholder="Enter your PayPal email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <Button className="w-full bg-black hover:bg-black/90" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Confirmation Modal */}
      <WithdrawalConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        amount={Number(amount)}
        bankDetails={{
          accountName: email,
          bankName: "PayPal",
          accountNumber: email,
        }}
        fee={1000} // Example fee
      />
    </>
  )
}

export default PayPalWithdrawModal
