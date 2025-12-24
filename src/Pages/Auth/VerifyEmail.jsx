import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"
import useAuthStore from "@/store/authStore"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(84)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { state } = useLocation()
  const email =  state?.email

  const { verifyToken, resendOtp } = useAuthStore()

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value
    // Only allow numbers and limit to 6 digits
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value)
    }
  }

  // Handle countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  // Handle resend code
  const handleResend = () => {
    if (canResend) {
      setTimer(84)
      setCanResend(false)
      // Add your resend logic here
      resendOtp({otp, email})
    }
  }

  // Handle form submission and call verifyToken with email and otp
  const handleSubmit = async (e) => {
    console.log({otp, email})
    console.log(typeof otp, typeof email)
    e.preventDefault()
    setError("")

    /* const data = {
      "otp": otp,
      "email": "joshporsche10@gmail.com"
    }
 */
    if (!email) {
      setError("No email provided. Please go back and retry signup.")
      return
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.")
      return
    }

    setLoading(true)
    try {
      // Pass both email and otp to the auth handler as properties
      await verifyToken({otp, email})
      // On success navigate onward
      navigate("/user-type")
    } catch (err) {
      setError(err?.message || "Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to you at{" "}
            <span className="font-medium text-foreground">
              {email ? email.replace(/^(.).+(@.+)$/, "$1***$2") : "j*@domain.com"}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              OTP code <span className="text-muted-foreground">(6 digits)</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              className="w-full px-3 py-2 border rounded-md text-lg tracking-[0.5em] font-mono"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
            >
              {canResend ? "Resend code" : `Resend code in ${timer} Secs`}
            </button>
          </div>

          <CustomButton
            size="lg"
            type="submit"
            className="w-full bg-black hover:bg-black/90"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerifyEmail
