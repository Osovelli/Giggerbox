import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import ResetPasswordModal from "@/components/Authentication/ResetPasswordModal"
import useAuthStore from "@/store/authStore"

function VerifyPasswordOTP() {
  const { verifyChangePasswordOtp, loading } = useAuthStore()
  //const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || "")
  const [otp, setOtp] = useState("")

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value
    // Only allow numbers and limit to 6 digits
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Reset password for:", email)

    try {
      await verifyChangePasswordOtp(
        { email, otp }
      )
      setEmail("")
      navigate("/reset-password", { state: { email } })
    } catch (error) {
      console.error("Error during password reset:", error)
    }
  }
  

 /*  const handleModalClose = () => {
    setIsModalOpen(false)
    // Optionally redirect to login or home page
    navigate("/signin")
  } */

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Change Your Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <CustomInput
            label="Email"
            type="email"
            placeholder="e.g johndoe@domainname.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <div className="space-y-2">
            <label className="text-sm font-medium">
              OTP code <span className="text-muted-foreground">(6 digits)</span>
            </label>
            <CustomInput
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              className="w-full px-3 py-2 border rounded-md text-lg tracking-[0.5em] font-mono"
            />
            </div>
          </div>

          <CustomButton 
          onClick={handleSubmit}
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          disabled={loading}
          >
            verify password OTP
          </CustomButton>
        </form>
      </div>
      {/* <ResetPasswordModal isOpen={isModalOpen} onClose={handleModalClose} /> */}
    </AuthLayout>
  )
}


export default VerifyPasswordOTP

