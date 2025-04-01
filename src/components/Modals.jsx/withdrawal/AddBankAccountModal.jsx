import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BankAccountSuccessModal from "./BankAccountSuccessModal"

// Sample banks
const banks = [
  { id: "access", name: "Access Bank" },
  { id: "gtb", name: "Guaranty Trust Bank" },
  { id: "firstbank", name: "First Bank" },
  { id: "zenith", name: "Zenith Bank" },
  { id: "uba", name: "United Bank for Africa" },
]

function AddBankAccountModal({ isOpen, onClose, onSuccess }) {
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    accountNumber: "",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const handleChange = (field, value) => {
    setBankDetails((prev) => ({
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

    if (!bankDetails.bank) {
      newErrors.bank = "Please select a bank"
    }

    if (!bankDetails.accountNumber) {
      newErrors.accountNumber = "Please enter your account number"
    } else if (!/^\d{10}$/.test(bankDetails.accountNumber)) {
      newErrors.accountNumber = "Account number must be 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    setIsProcessing(true)

    // Simulate API call to verify account
    setTimeout(() => {
      setIsProcessing(false)

      // In a real app, you would get the account name from the API
      const fullBankDetails = {
        ...bankDetails,
        accountName: "Olowu Abayomi",
        bankName: banks.find((b) => b.id === bankDetails.bank)?.name || bankDetails.bank,
      }

      setIsSuccessModalOpen(true)

      // Pass the bank details to the parent component
      onSuccess(fullBankDetails)
    }, 1500)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Add Bank Account</h2>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <p className="text-gray-600 mb-6">Please fill in the bank account information</p>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank</label>
                <Select value={bankDetails.bank} onValueChange={(value) => handleChange("bank", value)}>
                  <SelectTrigger className={errors.bank ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bank && <p className="text-sm text-red-500">{errors.bank}</p>}
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank account number</label>
                <Input
                  placeholder="Enter account number"
                  value={bankDetails.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                  className={errors.accountNumber ? "border-red-500" : ""}
                />
                {errors.accountNumber && <p className="text-sm text-red-500">{errors.accountNumber}</p>}
              </div>

              <Button className="w-full bg-black hover:bg-black/90" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? "Verifying..." : "Continue"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <BankAccountSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </>
  )
}

export default AddBankAccountModal