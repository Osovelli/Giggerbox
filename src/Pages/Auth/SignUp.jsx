import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import CustomInput from "../../components/CustomInput"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your signup logic here
    navigate("/verifyEmail")
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Enter your details to join the Giggerz community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomInput label="First name" name="firstName" placeholder="e.g John" error={errors.firstName} />
            <CustomInput label="Last name" name="lastName" placeholder="e.g Doe" error={errors.lastName} />
            <CustomInput
              label="Other name"
              name="otherName"
              placeholder="e.g Stone"
              error={errors.otherName}
              optional
            />
          </div>

          {/* Phone Number */}
          <CustomInput label="Phone number" name="phone" placeholder="e.g 0810 000 0000" error={errors.phone} />

          {/* Email */}
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g johndoe@domainname.com"
            error={errors.email}
          />

          {/* Password */}
          <div className="relative">
            <CustomInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Referral Code */}
          <CustomInput label="Referral code" name="referralCode" placeholder="e.g 123456" error={errors.referralCode} />

          {/* Submit Button */}
          <CustomButton 
          type="submit" 
          size="lg"
          className="w-full bg-black hover:bg-black/90 round rounded-full"
          onClick={handleSubmit}
          >
            Sign Up
          </CustomButton>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <p className="text-sm text-center text-muted-foreground">
            By signing up you confirm that you accept our{" "}
            <Link to="/terms" className="text-foreground font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-foreground font-medium">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp



