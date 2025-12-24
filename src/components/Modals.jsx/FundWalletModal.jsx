import { useState, useRef, useEffect } from "react"
import { X, Building2, CreditCard, Copy } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import useWalletStore from "@/store/walletStore"

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
  {
    id: "direct_deposit",
    title: "Direct Deposit",
    description: "Deposit using Paystack",
    icon: <Building2 className="h-5 w-5" />,
  },
]

function FundWalletModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const { createManualDeposit, verifyManualDeposit, fetchBalance, loading } = useWalletStore()
  
  const paystackWindowRef = useRef(null)
  const pollIntervalRef = useRef(null)

  // Bank details
  const bankDetails = {
    bankName: "[Bank_Name]",
    accountNumber: "23521244325",
    accountName: "[Firstname_Lastname]",
  }

  // Cleanup on unmount or modal close
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
      if (paystackWindowRef.current && !paystackWindowRef.current.closed) {
        paystackWindowRef.current.close()
      }
    }
  }, [])

  // Clear interval when modal closes
  useEffect(() => {
    if (!isOpen) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      if (paystackWindowRef.current && !paystackWindowRef.current.closed) {
        paystackWindowRef.current.close()
        paystackWindowRef.current = null
      }
    }
  }, [isOpen])

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
  }

  const handleBackToMethods = () => {
    setSelectedMethod(null)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber)
    toast.success("Account number copied to clipboard")
  }

  const startPaystack = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    try {
      toast.loading("Initiating payment...", { id: "paystack-init" })
      
      // Step 1: Initiate deposit
      const depositResponse = await createManualDeposit({ amount: Number(amount) })
      const data = depositResponse?.data
      const authorizationUrl = data?.authorization_url
      const reference = data?.reference

      if (!authorizationUrl || !reference) {
        toast.error("Failed to get authorization URL or reference", { id: "paystack-init" })
        return
      }

      toast.success("Opening Paystack window...", { id: "paystack-init" })
      console.log("Deposit initiated with reference:", reference)

      // Open Paystack in a new window
      const windowFeatures = "width=600,height=700,left=100,top=100"
      paystackWindowRef.current = window.open(authorizationUrl, "_blank", windowFeatures)

      if (!paystackWindowRef.current) {
        toast.error("Popup blocked. Please allow popups and try again.", { id: "paystack-init" })
        return
      }

      // Clear any existing interval
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }

      // Poll the popup window
      pollIntervalRef.current = setInterval(async () => {
        try {
          // Check if window is closed
          if (!paystackWindowRef.current || paystackWindowRef.current.closed) {
            clearInterval(pollIntervalRef.current)
            pollIntervalRef.current = null
            
            toast.loading("Verifying payment...", { id: "paystack-verify" })
            
            try {
              // Verify the deposit
              await verifyManualDeposit({ reference })
              
              // Refresh wallet balance
              await fetchBalance()
              
              toast.success("Payment verified successfully!", { id: "paystack-verify" })
              
              // Reset form and close modal
              setAmount("")
              setEmail("")
              setSelectedMethod(null)
              onClose()
            } catch (verifyError) {
              console.error("Verification error:", verifyError)
              toast.error("Payment verification failed. Please contact support if money was deducted.", { 
                id: "paystack-verify",
                duration: 5000 
              })
            }
          }
        } catch (error) {
          console.error("Polling error:", error)
          clearInterval(pollIntervalRef.current)
          pollIntervalRef.current = null
        }
      }, 1000)

    } catch (error) {
      console.error("Error initiating deposit:", error)
      toast.error("Failed to initiate deposit", { id: "paystack-init" })
    }
  }

  const handleModalClose = () => {
    // Clean up when closing modal
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
    if (paystackWindowRef.current && !paystackWindowRef.current.closed) {
      paystackWindowRef.current.close()
      paystackWindowRef.current = null
    }
    setSelectedMethod(null)
    setAmount("")
    setEmail("")
    onClose()
  }

  const renderContent = () => {
    switch (selectedMethod) {
      case "bank":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Bank Transfer</h2>
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

      case "card":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Pay with Card</h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Card payments are powered by your integrated payment provider.</p>

            <div className="space-y-3">
              <label className="text-sm text-gray-500">Amount</label>
              <input
                className="w-full p-3 border rounded-md bg-white"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button className="mt-6 w-full" onClick={() => toast("Card flow not implemented in this demo")}>
              Continue
            </Button>

            <Button variant="outline" className="mt-3 w-full" onClick={handleBackToMethods}>
              Back
            </Button>
          </div>
        )

      case "direct_deposit":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Deposit via Paystack</h2>
            </div>

            <p className="text-gray-600 mb-4">
              Use Paystack to deposit funds instantly. Enter an amount and your email to proceed.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Amount</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-md bg-white"
                  placeholder="Enter amount (e.g. 1000)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <Button className="mt-6 w-full" onClick={startPaystack} disabled={loading}>
              {loading ? "Processing..." : "Pay with Paystack"}
            </Button>

            <Button variant="outline" className="mt-3 w-full" onClick={handleBackToMethods}>
              Back
            </Button>
          </div>
        )

      default:
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Fund Wallet</h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Use the options below to add money to your Giggerz wallet.
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
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogTitle className="sr-only">Fund Wallet</DialogTitle>
      <DialogContent className="sm:max-w-md p-0">{renderContent()}</DialogContent>
    </Dialog>
  )
}

export default FundWalletModal