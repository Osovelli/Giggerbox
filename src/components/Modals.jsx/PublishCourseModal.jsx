import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"

function PublishCourseModal({ isOpen, onClose, onSubmit }) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md" showClose={false}>
        <ModalHeader className="text-center space-y-4">
          {/* Illustration */}
          <div className="mx-auto w-36 h-36">
            <img
              src="/Hands Illustrations_40 1.svg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <ModalTitle className="text-center">Submit Your Course for Review</ModalTitle>
          <ModalDescription className="text-center">
            Your course will be reviewed by our team to ensure it meets our quality standards. Once approved, it will be
            published and available for gig workers to enroll.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="flex justify-center gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="w-32">
            Cancel
          </Button>
          <Button onClick={onSubmit} className="w-32 bg-black hover:bg-black/90">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PublishCourseModal

