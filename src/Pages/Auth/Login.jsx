import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import useAuthStore from "@/store/authStore"

function Login() {
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const emailFromState = location.state?.email
  const passwordFromState = location.state?.password
  const [formData, setFormData] = useState({
    email: emailFromState || "",
    password: passwordFromState || "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    // Add your login logic here
    console.log("Login attempt with:", formData)
    try {
      await login(
        {
          email: formData.email,
          password: formData.password,
        },
      )
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Login to Your Account</h1>
          <p className="text-muted-foreground">Enter your details to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g johndoe@domainname.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <CustomInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <CustomButton 
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          >
            Login
          </CustomButton>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Need to create an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login

