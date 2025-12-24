import { useState } from "react"
import { X, Building2, CreditCard, QrCode } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import BankTransferWithdrawModal from "./BankTransferWithdrawModal"
import PayPalWithdrawModal from "./PayPalWithdrawModal"
import EWalletWithdrawModal from "./EWalletWithdrawModal"
import useWalletStore from "@/store/walletStore"

const withdrawalMethods = [
  {
    id: "bank",
    title: "Bank Transfer",
    description: "Withdraw directly to your bank account.",
    icon: <Building2 className="h-5 w-5 text-white" />,
    iconBg: "bg-black",
  },
  {
    id: "paypal",
    title: "PayPal",
    description: "Withdraw directly to your PayPal account.",
    icon: <CreditCard className="h-5 w-5 text-white" />,
    iconBg: "bg-blue-600",
  },
  {
    id: "ewallet",
    title: "E-wallet",
    description: "Via your bank app or internet banking",
    icon: <QrCode className="h-5 w-5 text-white" />,
    iconBg: "bg-black",
  },
]

function WithdrawModal({ isOpen, onClose, walletBalance }) {
  const { withdrawalOtpRequest, loading} = useWalletStore()
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false)
  const [isPayPalModalOpen, setIsPayPalModalOpen] = useState(false)
  const [isEWalletModalOpen, setIsEWalletModalOpen] = useState(false)

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)

    // Open the appropriate modal based on the selected method
    if (methodId === "bank") {
      setIsBankTransferModalOpen(true)
      try {
        withdrawalOtpRequest()
      } catch (error) {
        console.log(error)
      }
      onClose()
    } else if (methodId === "paypal") {
      setIsPayPalModalOpen(true)
      onClose()
    } else if (methodId === "ewallet") {
      setIsEWalletModalOpen(true)
      onClose()
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0 ">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-xl font-bold">Withdraw</DialogTitle>
              {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <DialogDescription className="text-gray-600 mb-6">How would you like to withdraw your funds.</DialogDescription>

            <div className="space-y-3">
              {withdrawalMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 ${method.iconBg} rounded-full flex items-center justify-center`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{method.title}</h3>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-black hover:bg-black/90">Continue</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Transfer Modal */}
      <BankTransferWithdrawModal
        isOpen={isBankTransferModalOpen}
        onClose={() => {
          setIsBankTransferModalOpen(false)
          setSelectedMethod(null)
        }}
        walletBalance={walletBalance}
      />

      {/* PayPal Modal */}
      <PayPalWithdrawModal
        isOpen={isPayPalModalOpen}
        onClose={() => {
          setIsPayPalModalOpen(false)
          setSelectedMethod(null)
        }}
        walletBalance={walletBalance}
      />

      {/* E-Wallet Modal */}
      <EWalletWithdrawModal
        isOpen={isEWalletModalOpen}
        onClose={() => {
          setIsEWalletModalOpen(false)
          setSelectedMethod(null)
        }}
        walletBalance={walletBalance}
      />
    </>
  )
}

export default WithdrawModal