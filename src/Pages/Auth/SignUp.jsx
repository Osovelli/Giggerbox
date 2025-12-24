import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import CustomInput from "../../components/CustomInput"
import AuthLayout from "@/components/Authentication/AuthLayout"
import CustomButton from "@/components/CustomButton"
import useAuthStore from "@/store/authStore"


function SignUp() {
  const { user, registerUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
  })

  
  // Handle form submission
  const handleSubmit = async(e) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      password,
      referralCode,
    } = formData

    e.preventDefault()
    setErrors({})
    /* const formData = new FormData(e.target)
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
      referralCode: formData.get("referralCode"),
    } */
    try {
      console.log("Registering user with data:", formData)

      // Replace $SELECTION_PLACEHOLDER$ in SignUp.jsx with this:
      await registerUser({
        firstname,
        lastname,
        phone,
        email,
        password,
        /* referralCode: referralCode, */
      })

      // navigate with state
      navigate("/verifyEmail", { state: { email } })
      console.log("User registered successfully")

    } catch (error) {
      console.error("Error registering user:", error)
      setErrors(error.response?.data?.errors || { general: "Registration failed" })
    }
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
            <CustomInput 
            label="First name" 
            name="firstName" 
            placeholder="e.g John" 
            error={errors.firstname} 
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            value={formData.firstname}
            />
            <CustomInput 
            label="Last name" 
            name="lastName" 
            placeholder="e.g Doe" 
            error={errors.lastname} 
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
            value={formData.lastname}
            />
            <CustomInput
              label="Other name"
              name="otherName"
              placeholder="e.g Stone"
              error={errors.otherName}
              onChange={(e) => setFormData({ ...formData, otherName: e.target.value })}
              value={formData.otherName} //optional
              optional
            />
          </div>

          {/* Phone Number */}
          <CustomInput 
          label="Phone number" 
          name="phone" 
          placeholder="e.g 0810 000 0000" 
          error={errors.phone} 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          value={formData.phone}
          />

          {/* Email */}
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g johndoe@domainname.com"
            error={errors.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
          />

          {/* Password */}
          <div className="relative">
            <CustomInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
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
          <CustomInput 
          label="Referral code" 
          name="referralCode" 
          placeholder="e.g 123456" 
          error={errors.referralCode} 
          onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
          value={formData.referralCode}
          />

          {/* Submit Button */}
          <CustomButton 
          type="submit" 
          size="lg"
          className="w-full bg-black hover:bg-black/90 rounded-full"
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



