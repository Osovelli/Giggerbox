import { useState } from "react"
import { X, Building2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddBankAccountModal from "./AddBankAccountModal"
import WithdrawalConfirmationModal from "./WithdrawalConfirmationModal"

function BankTransferWithdrawModal({ isOpen, onClose, walletBalance }) {
  const [amount, setAmount] = useState("")
  const [isAddBankAccountModalOpen, setIsAddBankAccountModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)
  const [error, setError] = useState("")

  // Sample saved bank accounts
  const savedBanks = [
    {
      id: 1,
      name: "ACCESS BANK",
      accountNumber: "01234567890",
      accountName: "Olowu Abayomi",
    },
  ]

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)

    // Clear error when user types
    if (error) setError("")
  }

  const handleContinue = () => {
    // Validate amount
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (numAmount > walletBalance) {
      setError("Insufficient funds")
      return
    }

    // If user has saved banks, show confirmation modal
    // Otherwise, show add bank account modal
    if (savedBanks.length > 0) {
      setSelectedBank(savedBanks[0]) // Select the first bank by default
      setIsConfirmationModalOpen(true)
    } else {
      setIsAddBankAccountModalOpen(true)
    }
  }

  const handleBankAdded = (bankDetails) => {
    // In a real app, add the bank to the savedBanks array
    setIsAddBankAccountModalOpen(false)
    setSelectedBank(bankDetails)
    setIsConfirmationModalOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Bank Transfer</h2>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <p className="text-gray-600 mb-6">Withdraw directly to your bank account.</p>

            {/* Bank Transfer Icon and Description */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 mb-6">
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Bank Transfer</h3>
                <p className="text-sm text-gray-500">Withdraw directly to your bank account.</p>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2 mb-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <p className="text-sm text-gray-500 mb-6">Balance: N{walletBalance.toLocaleString()}</p>

            <Button className="w-full bg-black hover:bg-black/90" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Bank Account Modal */}
      <AddBankAccountModal
        isOpen={isAddBankAccountModalOpen}
        onClose={() => setIsAddBankAccountModalOpen(false)}
        onSuccess={handleBankAdded}
      />

      {/* Withdrawal Confirmation Modal */}
      <WithdrawalConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        amount={Number(amount)}
        bankDetails={selectedBank}
        fee={1000} // Example fee
      />
    </>
  )
}

export default BankTransferWithdrawModal