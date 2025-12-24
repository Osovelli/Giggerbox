import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BankAccountSuccessModal from "./BankAccountSuccessModal"
import useWalletStore from "@/store/walletStore"

// Sample banks
const banks = [
  { id: "access", name: "Access Bank", code: "044" },
  { id: "gtb", name: "Guaranty Trust Bank", code: "058" },
  { id: "firstbank", name: "First Bank", code: "011" },
  { id: "zenith", name: "Zenith Bank", code: "057" },
  { id: "uba", name: "United Bank for Africa", code: "033" },
]

function AddBankAccountModal({ isOpen, onClose, onSuccess }) {
  const {addBankAccount, validateBankAccount, loading} = useWalletStore()
  const [bankDetails, setBankDetails] = useState({
    bankId: "",         // selected bank id from `banks`
    bankCode: "",       // optional manual override
    bankName: "",       // optional manual override
    accountNumber: "",
    accountName: "",
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

    if (!bankDetails.bankId && !bankDetails.bankName) {
      newErrors.bankId = "Please select a bank"
    }

    if (!bankDetails.accountNumber) {
      newErrors.accountNumber = "Please enter your account number"
    } else if (!/^\d{10}$/.test(bankDetails.accountNumber)) {
      newErrors.accountNumber = "Account number must be 10 digits"
    }

    if (!bankDetails.accountName) {
      newErrors.accountName = "Please enter account name"
    }

    // derive bankCode if bank selected
    const bankObj = banks.find((b) => b.id === bankDetails.bankId)
    if (!bankObj && !bankDetails.bankCode) {
      newErrors.bankCode = "Bank code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      const bankObj = banks.find((b) => b.id === bankDetails.bankId) || {}

      const payload = {
        bankName: bankObj.name || bankDetails.bankName,
        bankCode: bankObj.code || bankDetails.bankCode,
        accountNumber: bankDetails.accountNumber,
        accountName: bankDetails.accountName,
      }

      // Step 1: Add bank account
      const res = await addBankAccount(payload)

      // Add a small delay between calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 2: Validate the bank account
      /* await validateBankAccount({
        bankCode: payload.bankCode,
        accountNumber: payload.accountNumber,
      }) */

      // Step 3: If both successful, open success modal
      const fullBankDetails = {
        bankId: bankDetails.bankId,
        bankName: payload.bankName,
        bankCode: payload.bankCode,
        accountNumber: bankDetails.accountNumber,
        accountName: bankDetails.accountName,
        ...(res?.data ? { serverResponse: res.data } : {}),
      }

      setIsSuccessModalOpen(true)
      if (onSuccess) onSuccess(fullBankDetails)
      setIsProcessing(false)
    } catch (err) {
      console.error("Add bank account error:", err)
      setIsProcessing(false)
      /* const msg = err?.response?.data?.message || "Failed to add bank account"
      toast.error(msg)
      if (err?.response?.data?.errors) setErrors(err.response.data.errors) */
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-xl font-bold">Add Bank Account</DialogTitle>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <DialogDescription className="text-gray-600 mb-6">Please fill in the bank account information</DialogDescription>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank</label>
                <Select value={bankDetails.bankId} onValueChange={(value) => {
                  handleChange("bankId", value)
                  // populate derived fields when selecting a bank
                  const b = banks.find((bn) => bn.id === value)
                  if (b) {
                    handleChange("bankCode", b.code)
                    handleChange("bankName", b.name)
                  }
                }}>
                  <SelectTrigger className={errors.bankId ? "border-red-500" : ""}>
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
                {errors.bankId && <p className="text-sm text-red-500">{errors.bankId}</p>}
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

              {/* Account Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Account name</label>
                <Input
                  placeholder="John Doe"
                  value={bankDetails.accountName}
                  onChange={(e) => handleChange("accountName", e.target.value)}
                  className={errors.accountName ? "border-red-500" : ""}
                />
                {errors.accountName && <p className="text-sm text-red-500">{errors.accountName}</p>}
              </div>

              {/* Bank Code (shows derived code but editable) */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank code</label>
                <Input
                  placeholder="e.g. 058"
                  value={bankDetails.bankCode}
                  onChange={(e) => handleChange("bankCode", e.target.value)}
                  className={errors.bankCode ? "border-red-500" : ""}
                />
                {errors.bankCode && <p className="text-sm text-red-500">{errors.bankCode}</p>}
              </div>

              {/* Routing Number */}
              {/* <div className="space-y-2">
                <label className="text-sm font-medium">Routing number</label>
                <Input
                  placeholder="Enter routing number"
                  value={bankDetails.routingNumber}
                  onChange={(e) => handleChange("routingNumber", e.target.value)}
                  className={errors.routingNumber ? "border-red-500" : ""}
                />
                {errors.routingNumber && <p className="text-sm text-red-500">{errors.routingNumber}</p>}
              </div> */}


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