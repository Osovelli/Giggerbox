import CustomButton from "../CustomButton"
import CustomInput from "../CustomInput"


function AuthForm({ title, subtitle, fields, submitText, alternateText, alternateLink, alternateLinkText, onSubmit }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <CustomInput key={field.name} {...field} />
        ))}

        <CustomButton 
        type="submit" 
        className="w-full"
        >
          {submitText}
        </CustomButton>
      </form>

      {alternateText && (
        <p className="text-center mt-6 text-sm text-muted-foreground">
          {alternateText}{" "}
          <a href={alternateLink} className="text-primary hover:underline">
            {alternateLinkText}
          </a>
        </p>
      )}
    </div>
  )
}

export default AuthForm

