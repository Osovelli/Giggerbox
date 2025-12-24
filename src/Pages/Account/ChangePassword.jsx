import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import CustomButton from "@/components/CustomButton"
import useAuthStore from "@/store/authStore"
import { toast } from "sonner"

function ChangePassword() {
  const { changePassword, loading } = useAuthStore()
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [errors, setErrors] = useState({})

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }))

    // clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!passwords.current) {
      newErrors.current = "Current password is required"
    }

    if (!passwords.new) {
      newErrors.new = "New password is required"
    } else if (passwords.new.length < 8) {
      newErrors.new = "Password must be at least 8 characters"
    }

    if (!passwords.confirm) {
      newErrors.confirm = "Please confirm your new password"
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match"
    }

    if (passwords.current === passwords.new) {
      newErrors.new = "New password must be different from current password"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    
    try {
      const payload = {
        currentPassword: passwords.current,
        newPassword: passwords.new,
        confirmPassword: passwords.confirm,
      }

      await changePassword(payload)

      // reset form on success
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      })
      setErrors({})
      toast.success("Password changed successfully")
    } catch (err) {
      console.error("Change password error:", err)
      const msg = err?.response?.data?.message || "Failed to change password"
      toast.error(msg)

      // handle field-specific errors from backend
      if (err?.response?.data?.errors && typeof err.response.data.errors === "object") {
        setErrors((prev) => ({
          ...prev,
          ...err.response.data.errors,
        }))
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground">Update your password to keep your account protected</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword.current ? "text" : "password"}
                name="current"
                value={passwords.current}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.current && <p className="text-sm text-red-500">{errors.current}</p>}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative">
              <Input
                type={showPassword.new ? "text" : "password"}
                name="new"
                value={passwords.new}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.new && <p className="text-sm text-red-500">{errors.new}</p>}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showPassword.confirm ? "text" : "password"}
                name="confirm"
                value={passwords.confirm}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
        </div>

        <CustomButton 
        disabled={loading} 
        size={"lg"} 
        type="submit" 
        className="w-full bg-black hover:bg-black/90 mt-8"
        >
          {loading ? "Saving..." : "Save"}
        </CustomButton>
      </form>
    </div>
  )
}

export default ChangePassword