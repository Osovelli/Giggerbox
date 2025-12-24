import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CustomButton from "@/components/CustomButton"
import useUserStore from "@/store/userStore"
import { toast } from "sonner"
import { useEffect } from "react"
function EditProfile() {
  const { user, changeProfile, loading } = useUserStore()
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
      profileImageUrl: "",
      profileImagePublicId: "",
    },
  })

  // populate form values when user available
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
    setValue("profileImageUrl", user?.profileImage?.url || "")
    setValue("profileImagePublicId", user?.profileImage?.publicId || "")
  }, [user, setValue])

  const validateForm = (data) => {
    const newErrors = {}

    if (!data.firstName || data.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!data.lastName || data.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    if (!data.phone || data.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 characters"
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email address"
    }

    return newErrors
  }

  const onSubmit = async(data) => {
    const validationErrors = validateForm(data)

    if (Object.keys(validationErrors).length > 0) {
      // apply validation errors to react-hook-form
      Object.entries(validationErrors).forEach(([k, v]) => setError(k, { type: "manual", message: v }))
      return
    }

    const payload = {
      profileImage: {
        url: data.profileImageUrl || "",
        publicId: data.profileImagePublicId || "",
      },
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
      await changeProfile(payload)
      //toast.success("Profile updated successfully!")
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update profile"
      toast.error(msg)
      const fieldErrors = err?.response?.data?.errors
      if (fieldErrors && typeof fieldErrors === "object") {
        Object.entries(fieldErrors).forEach(([key, value]) => {
          // map server keys to form keys if necessary
          const formKey = {
            firstname: "firstName",
            lastname: "lastName",
            othername: "otherName",
            phone: "phone",
            email: "email",
            bio: "bio",
          }[key] || key
          setError(formKey, { type: "server", message: Array.isArray(value) ? value.join(", ") : value })
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <p className="text-sm text-muted-foreground">Keep your profile up-to-date.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-left mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.profileImage?.url || "/avatar.jpeg"} />
            <AvatarFallback>{(user?.firstname?.[0] || "A") + (user?.lastname?.[0] || "O")}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium block">Profile image URL</label>
            <Input placeholder="https://..." {...register("profileImageUrl")} />
            <label className="text-sm font-medium block mt-2">Profile image publicId</label>
            <Input placeholder="users/profile_12345" {...register("profileImagePublicId")} />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First name</label>
            <Input placeholder="e.g John" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last name</label>
            <Input placeholder="e.g Doe" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Other name <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input placeholder="e.g Stone" {...register("otherName")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Select onValueChange={(value) => setValue("age", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="e.g 12years" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age} years
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Male" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
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
            <label className="text-sm font-medium">Phone number</label>
            <Input placeholder="e.g 0810 000 0000" {...register("phone")} />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="e.g johndoe@domainname.com" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Brief bio</label>
            <Textarea placeholder="Enter bio" className="min-h-[100px]" {...register("bio")} />
          </div>
        </div>

        <CustomButton size={'lg'} type="submit" className="w-full rounded-full bg-black hover:bg-black/90">
          {loading ? "Saving..." : "Save"}
        </CustomButton>
      </form>
    </div>
  )
}

export default EditProfile