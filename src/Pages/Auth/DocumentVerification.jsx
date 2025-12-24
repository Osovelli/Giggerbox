import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomRadioGroup from "@/components/CustomRadioGroup"
import CustomButton from "@/components/CustomButton"
import AuthLayout from "@/components/Authentication/AuthLayout"


const verificationOptions = [
  {
    value: "bvn",
    title: "Bank Verification Number (BVN)",
    description: "",
  },
  {
    value: "nin",
    title: "National Identity Number (NIN)",
    description: "",
  },
  {
    value: "passport",
    title: "Passport",
    description: "",
  },
  {
    value: "driving-license",
    title: "Driving License",
    description: "",
  },
]

function DocumentVerification() {
  const [selectedMethod, setSelectedMethod] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedMethod) {
      navigate("/verification-details", {
        state: { type: selectedMethod },
      })
    }
  }

  const handleSkip = () => {
    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Document verification</h1>
          <p className="text-muted-foreground">Securely verify your identity with either NIN or BVN.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomRadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            items={verificationOptions}
            required
          />

          <div className="flex gap-4">
            <CustomButton 
            type="submit" 
            className="flex-1 bg-black hover:bg-black/90" 
            disabled={!selectedMethod}
            >
              Continue
            </CustomButton>
            <CustomButton
             type="button" 
             variant="secondary" 
             className="flex-1" onClick={handleSkip}
             >
              Skip
            </CustomButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default DocumentVerification