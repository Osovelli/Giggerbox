import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CustomButton from "@/components/CustomButton"

function EditProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "Abayomi",
      lastName: "Olowu",
      email: "abayomiolowu@Giggerz.com",
    },
  })

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

  const onSubmit = (data) => {
    const validationErrors = validateForm(data)

    if (Object.keys(validationErrors).length === 0) {
      console.log(data)
      // Add your form submission logic here
    } else {
      // Handle validation errors
      console.log("Validation errors:", validationErrors)
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
            <AvatarImage src="/avatar.jpeg" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
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
            <div className="space-y-2">
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
          Save
        </CustomButton>
      </form>
    </div>
  )
}

export default EditProfile