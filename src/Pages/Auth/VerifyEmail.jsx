import { useState, useEffect } from "react"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"
import { useNavigate } from "react-router-dom"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(84)
  const [canResend, setCanResend] = useState(false)
  const navigate = useNavigate()

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value
    // Only allow numbers and limit to 6 digits
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value)
    }
  }

  // Format OTP for display
  const formatOtp = (value) => {
    return value.padEnd(6, " ").split("").join(" ")
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
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/user-type")
    // Add your verification logic here
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to you at <span className="font-medium text-foreground">j*@domian.com</span>
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
              placeholder="000-000"
              className="w-full px-3 py-2 border rounded-md text-lg tracking-[0.5em] font-mono"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
            >
              Resend code in {timer} Secs
            </button>
          </div>

          <CustomButton
            size="lg"
            type="submit" 
            className="w-full bg-black hover:bg-black/90" 
            disabled={otp.length !== 6}
            onClick={handleSubmit}
            >
            Verify OTP
          </CustomButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default VerifyEmail

