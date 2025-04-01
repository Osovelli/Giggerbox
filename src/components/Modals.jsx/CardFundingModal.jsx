import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddCardModal from "./AddCardModal"

function CardFundingModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("")
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState("mastercard")

  // Sample cards data
  const cards = [
    {
      id: "mastercard",
      name: "Mastercard",
      type: "Debit",
      lastFour: "0000",
      isDefault: true,
      icon: (
        <div className="flex">
          <div className="h-8 w-8 bg-red-500 rounded-full opacity-70"></div>
          <div className="h-8 w-8 bg-yellow-500 rounded-full -ml-4 opacity-70"></div>
        </div>
      ),
    },
    {
      id: "visacard",
      name: "Visacard",
      type: "Debit",
      lastFour: "0000",
      isDefault: false,
      icon: (
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">V</div>
      ),
    },
  ]

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId)
  }

  const handleAddCard = () => {
    setIsAddCardModalOpen(true)
  }

  const handleAddCardSuccess = (newCard) => {
    // Here you would add the new card to your cards array
    console.log("New card added:", newCard)
    setIsAddCardModalOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Card</h2>
            {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button> */}
          </div>

          <p className="text-gray-600 mb-6">
            Choose an existing card or add a new one to fund your wallet quickly and securely.
          </p>

          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input placeholder="Enter amount" value={amount} onChange={handleAmountChange} />
            </div>

            {/* Card Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Select funding source</label>

              <div className="space-y-3">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCardSelect(card.id)}
                  >
                    <div className="flex items-center gap-3">
                      {card.icon}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{card.name}</p>
                          {card.isDefault && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">DEFAULT</span>}
                        </div>
                        <p className="text-sm text-gray-500">
                          {card.type} •••• {card.lastFour}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Add Card Button */}
            <Button
              variant="secondary"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900"
              onClick={handleAddCard}
            >
              Add Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSuccess={handleAddCardSuccess}
      />
    </>
  )
}

export default CardFundingModal