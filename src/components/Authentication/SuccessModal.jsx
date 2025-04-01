import { Button } from "@/components/ui/button"
import { CustomModal, CustomModalContent } from "../CustomModal"


function SuccessModal({ isOpen, onClose }) {
  return (
    <CustomModal open={isOpen} onOpenChange={onClose}>
      <CustomModalContent className="text-center">
        {/* High Five Illustration */}
        <div className="mb-6">
          <img
            src="/handclap.png"
            alt="Success"
            className="w-24 h-24 mx-auto"
          />
        </div>

        {/* Success Message */}
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-semibold">You are all set</h2>
          <p className="text-muted-foreground">
            Congratulations! Your identity has been successfully verified with Giggerz. You're all set to access our
            services.
          </p>
        </div>

        {/* Continue Button */}
        <Button onClick={onClose} className="w-full bg-black hover:bg-black/90">
          Continue
        </Button>
      </CustomModalContent>
    </CustomModal>
  )
}

export default SuccessModal

