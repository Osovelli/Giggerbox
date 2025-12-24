import { useEffect, useState } from "react"
import { X, Building2, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddBankAccountModal from "./AddBankAccountModal"
import WithdrawalConfirmationModal from "./WithdrawalConfirmationModal"
import useWalletStore from "@/store/walletStore"

function BankTransferWithdrawModal({ isOpen, onClose, walletBalance }) {
  const { getBankAccounts, deleteBankAccount, loading } = useWalletStore()
  const [savedBanks, setSavedBanks] = useState([])
  const [amount, setAmount] = useState("")
  const [isAddBankAccountModalOpen, setIsAddBankAccountModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)
  const [error, setError] = useState("")

  // Fetch bank accounts when modal opens
  /* useEffect(() => {
    let mounted = true
    if (isOpen) {
      const fetchBankAccounts = async () => {
        const accounts = await getBankAccounts()
        setSavedBanks(accounts || [])
      }
      fetchBankAccounts()
    }
  }, [isOpen]) */

  // Fetch bank accounts when modal opens
  useEffect(() => {
    let mounted = true
    if (isOpen) {
      const fetchBankAccounts = async () => {
        try {
          const accounts = await getBankAccounts()
          if (!mounted) return
          // normalize the response shape
          const list = Array.isArray(accounts) ? accounts : accounts?.data || accounts?.accounts || []
          //console.log("Bank accounts:", list?.accounts)
          setSavedBanks(list?.accounts || [])
        } catch (err) {
          if (mounted) setSavedBanks([])
        }
      }
      fetchBankAccounts()
    } else {
      // clear selection when modal closed
      setSelectedBank(null)
      setSavedBanks([])
    }
    return () => {
      mounted = false
    }
  }, [isOpen, getBankAccounts])

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)
    if (error) setError("")
  }

  /* const handleContinue = () => {
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (numAmount > walletBalance) {
      setError("Insufficient funds")
      return
    }

    if (savedBanks.length > 0) {
      setSelectedBank(savedBanks[0])
      setIsConfirmationModalOpen(true)
    } else {
      setIsAddBankAccountModalOpen(true)
    }
  } */

  const handleContinue = () => {
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (numAmount > walletBalance) {
      setError("Insufficient funds")
      return
    }

    if (!selectedBank) {
      if (savedBanks.length > 0) {
        setError("Please select a bank")
        return
      } else {
        setIsAddBankAccountModalOpen(true)
        return
      }
    }

    setIsConfirmationModalOpen(true)
  }

  // Handle successful bank addition
  const handleBankAdded = (bankDetails) => {
    // prepend new bank and select it
    setSavedBanks((prev) => [bankDetails, ...prev])
    //setSavedBanks([...savedBanks, bankDetails])
    setIsAddBankAccountModalOpen(false)
    setSelectedBank(bankDetails)
    setIsConfirmationModalOpen(true)
  }

  // Handle bank selection
  const handleSelectBank = (bank) => {
    setSelectedBank(bank)
    setError("")
  }

  // Handle bank deletion
  const handleDeleteBank = (e, bankId) => {
    e.stopPropagation()
    // local remove now; API delete will be added later
    deleteBankAccount(bankId)
    setSavedBanks((prev) => prev.filter((b) => b._id !== bankId && b.id !== bankId))
    if (selectedBank && (selectedBank._id === bankId || selectedBank.id === bankId)) {
      setSelectedBank(null)
    }
  }

  // Mask account number
  const maskAccount = (acct) => {
    if (!acct) return ""
    const s = String(acct)
    if (s.length <= 4) return s
    return "•••• " + s.slice(-4)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-4 max-h-96 overflow-y-scroll">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-xl font-bold">Bank Transfer</DialogTitle>
            </div>

            <DialogDescription className="text-gray-600 mb-6">Withdraw directly to your bank account.</DialogDescription>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 mb-6">
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Bank Transfer</h3>
                <p className="text-sm text-gray-500">Withdraw directly to your bank account.</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Amount</label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {/* Saved banks list */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Saved bank accounts</p>
                <Button variant="ghost" size="sm" onClick={() => setIsAddBankAccountModalOpen(true)}>Add</Button>
              </div>

              {savedBanks?.length === 0 ? (
                <p className="text-sm text-gray-500">No saved bank accounts.</p>
              ) : (
                <div className="space-y-2">
                  {savedBanks?.map((bank) => {
                    const id = bank?._id || bank?.id
                    const isSelected = selectedBank && (selectedBank._id === id || selectedBank.id === id)
                    return (
                      <div
                        key={id}
                        onClick={() => handleSelectBank(bank)}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5 border-primary" : "hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">{bank?.bankName || bank?.bank || bank?.bankName}</p>
                          <p className="text-sm text-gray-500">{maskAccount(bank?.accountNumber)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* delete icon (local remove) */}
                          <button
                            onClick={(e) => handleDeleteBank(e, id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Delete bank"
                            title="Delete bank"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {isSelected && (
                            <div className="text-sm text-green-600 font-medium">Selected</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <Button className="w-full bg-black hover:bg-black/90" onClick={handleContinue} disabled={loading}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddBankAccountModal
        isOpen={isAddBankAccountModalOpen}
        onClose={() => setIsAddBankAccountModalOpen(false)}
        onSuccess={handleBankAdded}
      />

      <WithdrawalConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        amount={Number(amount)}
        bankDetails={selectedBank}
        fee={1000}
      />
    </>
  )
}

export default BankTransferWithdrawModal
