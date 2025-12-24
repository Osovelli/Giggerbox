import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomInput from "@/components/CustomInput"
import { Button } from "@/components/ui/button"
import useUserStore from "@/store/userStore"

function VerificationDetails() {
  const { identityVerification, loading, error } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()
  const type = location.state?.type ?? "nin" // expected: "nin" | "bvn" | "passport" | "drivers_license"

  // common
  const [documentNumber, setDocumentNumber] = useState("")

  // passport-specific
  const [nationality, setNationality] = useState("")

  // driver's license-specific
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState("")

  const config = {
    nin: {
      title: "Document verification",
      label: "NIN",
      placeholder: "Enter your National Identity Number (NIN)",
      helper: "Dial *565*0# on your registered phone number to get your NIN",
    },
    bvn: {
      title: "Document verification",
      label: "BVN",
      placeholder: "Enter your Bank Verification Number (BVN)",
      helper: "Dial *565*0# on your registered phone number to get your BVN",
    },
    passport: {
      title: "Passport verification",
      label: "Passport Number",
      placeholder: "Enter your passport number (e.g. A1234567)",
      helper: "Provide the passport number and nationality",
    },
    drivers_license: {
      title: "Driver's license verification",
      label: "License Number",
      placeholder: "Enter your driver's license number",
      helper: "Provide license number and date of birth (and expiry if available)",
    },
  }

  const current = config[type] ?? config.nin

  const isValid = () => {
    if (!documentNumber) return false
    if (type === "passport" && !nationality) return false
    if (type === "drivers_license" && !dateOfBirth) return false
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid()) return
    // TODO: attach the appropriate verification payload based on `type`
    // Example payload could include: { type, documentNumber, nationality, dateOfBirth, licenseExpiry }
    navigate("/liveness-check", { state: { from: "verification", type } })
  }

  const handleSkip = () => {
    navigate("/dashboard")
  }

  const [issueDate, setIssueDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [documentImage, setDocumentImage] = useState("")

  const isValidPassport = () => {
    return (
      documentNumber &&
      nationality &&
      issueDate &&
      expiryDate &&
      documentImage
    )
  }

  const handleSubmitLocal = async (e) => {
    e.preventDefault()

    if (type === "passport") {
      //if (!isValidPassport()) return
      console.log("Submitting verification for type:", type)

      const payload = {
        type: "InternationalPassport",
        number: documentNumber,
        issueDate,
        expiryDate,
        documentImage,
      }

      console.log("passport verification payload", payload)

      try {
        const result = await identityVerification({ payload })
        console.log("passport verification result", result)
        navigate("/liveness-check", { state: { from: "verification", type, payload, result } })
      } catch (err) {
        console.error("passport verification failed", err)
        // store's error state can be used to show UI feedback
      }

      return
    }

    // Non-passport flows: reuse existing validation
    if (!isValid()) return

    const payload = { type, documentNumber, nationality, dateOfBirth, licenseExpiry }

    try {
      const result = await identityVerification(payload)
      console.log("verification result", result)
      navigate("/liveness-check", { state: { from: "verification", type, payload, result } })
    } catch (err) {
      console.error("verification failed", err)
      // handle/show error as needed
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">{current.title}</h1>
          <p className="text-muted-foreground">
            Please enter your {current.label} to proceed with identity verification
          </p>
        </div>

        <form onSubmit={handleSubmitLocal} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{current.label}</label>
            <CustomInput
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder={current.placeholder}
            />
            <p className="text-sm text-muted-foreground">{current.helper}</p>
          </div>

          {type === "passport" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nationality</label>
                <CustomInput
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="Enter your nationality (e.g. Nigeria)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Date</label>
                <CustomInput
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <CustomInput
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Document Image (upload)</label>

                {/* File input: read the file as a data URL and store in documentImage */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) {
                      setDocumentImage("")
                      return
                    }
                    const reader = new FileReader()
                    reader.onload = () => {
                      setDocumentImage(reader.result) // data URL string
                    }
                    reader.readAsDataURL(file)
                  }}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold"
                />
                <p className="text-sm text-muted-foreground">
                  Upload a clear image of your passport (JPEG/PNG). The image will be converted to a data URL for preview and submission.
                </p>

                {documentImage && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Preview</p>
                    <div className="flex items-start gap-4">
                      <img
                        src={documentImage}
                        alt="Document preview"
                        className="max-h-40 rounded-md border"
                      />
                      <div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setDocumentImage("")}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {type === "drivers_license" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <CustomInput
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">License Expiry (optional)</label>
                <CustomInput
                  type="date"
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground">
              Giggerz wants to access your {current.label} information. By clicking Continue, you agree to allow
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

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-black/90"
              //disabled={type === "passport" ? !isValidPassport() : !isValid() || loading}
              disabled={loading}
            >
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
