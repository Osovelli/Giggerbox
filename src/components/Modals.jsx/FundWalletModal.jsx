import { useState } from "react"
import { X, Building2, CreditCard, Copy } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const paymentMethods = [
  {
    id: "bank",
    title: "Bank transfer",
    description: "Via your bank app or internet banking",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "card",
    title: "Card",
    description: "Add money using your debit card",
    icon: <CreditCard className="h-5 w-5" />,
  },
]

function FundWalletModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [showBankDetails, setShowBankDetails] = useState(false)

  // Bank details
  const bankDetails = {
    bankName: "[Bank_Name]",
    accountNumber: "23521244325",
    accountName: "[Firstname_Lastname]",
  }

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
    if (methodId === "bank") {
      setShowBankDetails(true)
    }
  }

  const handleBackToMethods = () => {
    setShowBankDetails(false)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber)
    toast.success("Account number copied to clipboard")
  }

  const renderContent = () => {
    if (showBankDetails) {
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Bank Transfer</h2>
            {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button> */}
          </div>

          <p className="text-gray-600 mb-6">
            Use the details below to send money to your Giggerz wallet from any bank's app or through internet banking
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Bank</label>
              <div className="bg-gray-50 p-4 rounded-md">{bankDetails.bankName}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Account number</label>
              <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                {bankDetails.accountNumber}
                <Button variant="ghost" size="sm" onClick={handleCopyAccountNumber} className="text-primary">
                  COPY <Copy className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Account name</label>
              <div className="bg-gray-50 p-4 rounded-md">{bankDetails.accountName}</div>
            </div>
          </div>

          <Button variant="outline" className="mt-6 w-full" onClick={handleBackToMethods}>
            Back
          </Button>
        </div>
      )
    }

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Fund Wallet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Use the details below to send money to your Giggerz wallet from any bank's app or through internet banking.
        </p>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors",
                selectedMethod === method.id ? "bg-primary/5 border border-primary" : "bg-gray-50 hover:bg-gray-100",
              )}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white">
                {method.icon}
              </div>
              <div>
                <h3 className="font-medium">{method.title}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0">{renderContent()}</DialogContent>
    </Dialog>
  )
}

export default FundWalletModal