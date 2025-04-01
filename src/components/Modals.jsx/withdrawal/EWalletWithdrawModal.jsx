import { useState } from "react"
import { X, QrCode } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WithdrawalConfirmationModal from "./WithdrawalConfirmationModal"

// Sample e-wallets
const ewallets = [
  { id: "opay", name: "OPay" },
  { id: "palmpay", name: "PalmPay" },
  { id: "kuda", name: "Kuda" },
  { id: "moniepoint", name: "Moniepoint" },
]

function EWalletWithdrawModal({ isOpen, onClose, walletBalance }) {
  const [amount, setAmount] = useState("")
  const [walletDetails, setWalletDetails] = useState({
    wallet: "",
    phoneNumber: "",
  })
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

  const handleWalletChange = (field, value) => {
    setWalletDetails((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
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

    // Validate wallet
    if (!walletDetails.wallet) {
      newErrors.wallet = "Please select an e-wallet"
    }

    // Validate phone number
    if (!walletDetails.phoneNumber) {
      newErrors.phoneNumber = "Please enter your phone number"
    } else if (!/^\d{11}$/.test(walletDetails.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits"
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
              <h2 className="text-xl font-bold">E-wallet</h2>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <p className="text-gray-600 mb-6">Via your bank app or internet banking</p>

            {/* E-wallet Icon and Description */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 mb-6">
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">E-wallet</h3>
                <p className="text-sm text-gray-500">Via your bank app or internet banking</p>
              </div>
            </div>

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

              {/* E-wallet Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select E-wallet</label>
                <Select value={walletDetails.wallet} onValueChange={(value) => handleWalletChange("wallet", value)}>
                  <SelectTrigger className={errors.wallet ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select e-wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {ewallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.wallet && <p className="text-sm text-red-500">{errors.wallet}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  value={walletDetails.phoneNumber}
                  onChange={(e) => handleWalletChange("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
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
          accountName: walletDetails.phoneNumber,
          bankName: ewallets.find((w) => w.id === walletDetails.wallet)?.name || "E-wallet",
          accountNumber: walletDetails.phoneNumber,
        }}
        fee={1000} // Example fee
      />
    </>
  )
}

export default EWalletWithdrawModal

