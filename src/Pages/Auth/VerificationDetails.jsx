import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomInput from "@/components/CustomInput"
import { Button } from "@/components/ui/button"

function VerificationDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const isNIN = location.state?.type === "nin"

  const [documentNumber, setDocumentNumber] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (documentNumber) {
      // Add your verification logic here
      navigate("/liveness-check")
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
          <p className="text-muted-foreground">
            Please enter your {isNIN ? "NIN" : "BVN"} to proceed with identity verification
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Document Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{isNIN ? "NIN" : "BVN"}</label>
            <CustomInput
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder={`Enter your ${isNIN ? "National Identity Number (NIN)" : "Bank Verification Number (BVN)"}`}
            />
            <p className="text-sm text-muted-foreground">
              Dial *565*0# on your registered phone number to get your {isNIN ? "NIN" : "BVN"}
            </p>
          </div>

          {/* Consent Information */}
          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground">
              Giggerz wants to access your {isNIN ? "NIN" : "BVN"} Information. By clicking Continue, you agree to allow
              Giggerz to:
            </p>
            <ul className="space-y-2 text-sm pl-4">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your personal details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your contact information
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground" />
                Process your document information
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-black hover:bg-black/90" disabled={!documentNumber}>
              Continue
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerificationDetails

