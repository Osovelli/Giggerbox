import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

function AddCardModal({ isOpen, onClose, onSuccess }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    isDefault: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleDefault = () => {
    setCardDetails((prev) => ({
      ...prev,
      isDefault: !prev.isDefault,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically validate and process the card details
    onSuccess(cardDetails)
    // Reset form
    setCardDetails({
      cardNumber: "",
      cvv: "",
      expiryDate: "",
      isDefault: false,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Add card</h2>
         {/*  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button> */}
        </div>

        <p className="text-gray-600 mb-6">
          You will not be charged now. We will only charge you when you are making a deposit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Number</label>
            <Input
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>

          {/* CVV and Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CVV</label>
              <Input name="cvv" placeholder="123" value={cardDetails.cvv} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valid Until</label>
              <Input
                name="expiryDate"
                placeholder="MM/YYYY"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Set as Default */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Set as default</label>
            <Switch checked={cardDetails.isDefault} onCheckedChange={handleToggleDefault} />
          </div>

          {/* Add Card Button */}
          <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">
            Add Card
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCardModal