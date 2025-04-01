import { Button } from "@/components/ui/button"
import { CustomModal, CustomModalContent } from "../CustomModal"


function ResetPasswordModal({ isOpen, onClose }) {
  return (
    <CustomModal isOpen={isOpen} onOpenChange={onClose}>
        <CustomModalContent className="text-center">
            <div className="text-center p-6">
                {/* Illustration */}
                <div className="mb-6">
                    <img
                        src="/Hands Illustrations.png"
                        alt=""
                        className="w-24 h-24 mx-auto"
                    />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-semibold mb-2">Check Your Inbox</h2>
                <p className="text-muted-foreground mb-6">
                We've sent a password reset link to your email. Click the link to create a new password.
                </p>

                {/* Button */}
                <Button onClick={onClose} className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200" variant="secondary">
                Continue
                </Button>
            </div>
        </CustomModalContent>
    </CustomModal>
  )
}

export default ResetPasswordModal

