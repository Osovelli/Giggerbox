import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2 } from "lucide-react"
import CustomButton from "@/components/CustomButton"
import useUserStore from "@/store/userStore"
import toast from "react-hot-toast"
import { useEffect, useState, useRef } from "react"

function EditProfile() {
  const { user, changeProfile, changeProfilePicture, loading } = useUserStore()
  const [imageLoading, setImageLoading] = useState(false)
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      otherName: "",
      dob: "",
      nationality: "",
      phone: "",
      email: "",
      bio: "",
    },
  })

  // Populate form values when user available
  useEffect(() => {
    console.log("Populating form with user data:", user)
    if (!user) return
    setValue("firstName", user?.firstname || user?.firstName || "")
    setValue("lastName", user?.lastname || user?.lastName || "")
    setValue("otherName", user?.othername || user?.otherName || "")
    setValue("dob", user?.dob || "")
    setValue("nationality", user?.nationality || "")
    setValue("phone", user?.phone || "")
    setValue("email", user?.email || "")
    setValue("bio", user?.bio || "")
    
    // Set initial profile image preview
    if (user?.profileImage?.url) {
      setProfileImagePreview(user.profileImage.url)
    }
  }, [user, setValue])

  const validateForm = (data) => {
    const newErrors = {}

    const isFirstNameValid = data.firstName && data.firstName.length >= 2
    const isLastNameValid = data.lastName && data.lastName.length >= 2
    const isPhoneValid = data.phone && data.phone.length >= 10
    const isEmailValid = data.email && /\S+@\S+\.\S+/.test(data.email)

    if (!isFirstNameValid && !isLastNameValid && !isPhoneValid && !isEmailValid) {
      newErrors.firstName = "At least one field must be valid"
    }

    return newErrors
  }

  // Handle profile picture change
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file")
      return
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    try {
      setImageLoading(true)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Upload profile picture
      await changeProfilePicture({ profileImage: file })
      
      toast.success("Profile picture updated successfully!")
    } catch (err) {
      console.error("Error uploading profile picture:", err)
      const msg = err?.response?.data?.message || "Failed to update profile picture"
      toast.error(msg)
      
      // Revert preview on error
      setProfileImagePreview(user?.profileImage?.url || null)
    } finally {
      setImageLoading(false)
    }
  }

  // Handle form submission for profile details
  const onSubmit = async (data) => {
    const validationErrors = validateForm(data)

    if (Object.keys(validationErrors).length > 0) {
      // Apply validation errors to react-hook-form
      Object.entries(validationErrors).forEach(([k, v]) => 
        setError(k, { type: "manual", message: v })
      )
      return
    }

    const payload = {
      firstname: data.firstName,
      lastname: data.lastName,
      othername: data.otherName || "",
      dob: data.dob || "",
      nationality: data.nationality || "",
      phone: data.phone,
      email: data.email,
      bio: data.bio || "",
    }

    try {
      await changeProfile({ payload })
      toast.success("Profile updated successfully!")
    } catch (err) {
      console.error("Error updating profile:", err)
      const msg = err?.response?.data?.message || "Failed to update profile"
      toast.error(msg)
      
      const fieldErrors = err?.response?.data?.errors
      if (fieldErrors && typeof fieldErrors === "object") {
        Object.entries(fieldErrors).forEach(([key, value]) => {
          // Map server keys to form keys if necessary
          const formKey = {
            firstname: "firstName",
            lastname: "lastName",
            othername: "otherName",
            phone: "phone",
            email: "email",
            bio: "bio",
          }[key] || key
          setError(formKey, { 
            type: "server", 
            message: Array.isArray(value) ? value.join(", ") : value 
          })
        })
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <p className="text-sm text-muted-foreground">Keep your profile up-to-date.</p>
      </div>

      {/* Profile Picture Section - Separate from form */}
      <div className="flex items-center gap-6 p-6 border rounded-lg bg-gray-50">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImagePreview || user?.profileImage?.url} />
            <AvatarFallback>
              {(user?.firstname?.[0] || "A") + (user?.lastname?.[0])}
            </AvatarFallback>
          </Avatar>
          
          {/* Camera icon overlay */}
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={imageLoading}
            className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {imageLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            disabled={imageLoading}
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-1">Profile Picture</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Click the camera icon to upload a new profile picture
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, GIF (Max size: 5MB)
          </p>
        </div>
      </div>

      {/* Profile Details Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              First name <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g John" 
              {...register("firstName")} 
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Last name <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g Doe" 
              {...register("lastName")}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Other name <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input placeholder="e.g Stone" {...register("otherName")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of birth</label>
              <Input type="date" {...register("dob")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nationality</label>
              <Input placeholder="e.g. Nigerian" {...register("nationality")} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phone number <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g 0810 000 0000" 
              {...register("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g johndoe@domainname.com" 
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Brief bio</label>
            <Textarea 
              placeholder="Tell us about yourself" 
              className="min-h-[100px]" 
              {...register("bio")} 
            />
          </div>
        </div>

        <CustomButton 
          size="lg" 
          type="submit" 
          className="w-full rounded-full bg-black hover:bg-black/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </CustomButton>
      </form>
    </div>
  )
}

export default EditProfile