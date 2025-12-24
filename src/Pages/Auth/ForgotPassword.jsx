import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import ResetPasswordModal from "@/components/Authentication/ResetPasswordModal"
import useAuthStore from "@/store/authStore"

function ForgotPassword() {
  const { forgotPassword, loading } = useAuthStore()
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Reset password for:", email)

    try {
      await forgotPassword(
        { email }
      )
      setEmail("")
      navigate("/verify-password-otp", { state: { email } })
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Email"
            type="email"
            placeholder="e.g johndoe@domainname.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomButton 
          onClick={handleSubmit}
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          disabled={loading}
          >
            Send Reset Link
          </CustomButton>
        </form>
      </div>
      {/* <ResetPasswordModal isOpen={isModalOpen} onClose={handleModalClose} /> */}
    </AuthLayout>
  )
}


export default ForgotPassword

