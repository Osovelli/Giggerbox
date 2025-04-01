import { Modal, ModalContent } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

function EnrollmentSuccessModal({ isOpen, onClose, courseTitle, date, time, tutorName, onContinue }) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md">
        <div className="p-6 text-center">
          {/* High Five Illustration */}
          <div className="mb-6">
            <img
              src="/handclap.png"
              alt=""
              className="w-24 h-24 mx-auto"
            />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-semibold mb-8">You've successfully enrolled in {courseTitle}!</h2>

          {/* Course Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Tutor name</span>
              <span className="font-medium">{tutorName}</span>
            </div>
          </div>

          {/* Reminder Message */}
          <p className="text-muted-foreground text-sm mb-8">
            You'll receive a reminder before your session starts. Access the video or chat section at the scheduled
            time, thank you.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1 bg-black hover:bg-black/90" onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default EnrollmentSuccessModal