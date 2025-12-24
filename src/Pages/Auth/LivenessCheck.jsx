import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "@/components/Authentication/AuthLayout"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import SuccessModal from "@/components/Authentication/SuccessModal"
import useUserStore from "@/store/userStore"

const STATES = {
  INITIAL: "initial",
  CAMERA_ACTIVE: "camera_active",
  PHOTO_CAPTURED: "photo_captured",
}

function LivenessCheck() {
  const { selfieVerification, loading, error: storeError } = useUserStore()
  const [checkState, setCheckState] = useState(STATES.INITIAL)
  const [cameraError, setCameraError] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const shutterRef = useRef(new Audio("/shutter.mp3"))
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      })

      // store stream and attach if video is already mounted
      streamRef.current = stream
      if (videoRef.current) {
        try {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        } catch (err) {
          // Play might fail due to autoplay policies; we'll still set the state and attach later
          console.warn("Could not autoplay video immediately:", err)
        }
      }

      setCameraError(null)
      setCheckState(STATES.CAMERA_ACTIVE)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError(
        err.name === "NotAllowedError"
          ? "Camera access denied. Please enable camera access to continue."
          : "Unable to access camera. Error: " + err.message
      )
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause()
      } catch (e) {
        /* ignore */
      }
      try {
        videoRef.current.srcObject = null
      } catch (e) {
        /* ignore */
      }
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (video) {
      try {
        shutterRef.current.play().catch(console.error)

        const canvas = document.createElement("canvas")
        
        // Use actual video dimensions to capture the correct aspect ratio
        const vWidth = video.videoWidth || 1280
        const vHeight = video.videoHeight || 720

        canvas.width = vWidth
        canvas.height = vHeight
        
        const ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageData)
        stopCamera()
        setCheckState(STATES.PHOTO_CAPTURED)
        setCameraError(null)
      } catch (err) {
        console.error("Error capturing photo:", err)
        setCameraError("Failed to capture photo: " + err.message)
      }
    } else {
      setCameraError("Camera not available for capture.")
    }
  }

  // If we switch to CAMERA_ACTIVE and the stream exists but the video element wasn't present
  // when we acquired the stream, attach the stream and start playback now.
  useEffect(() => {
    if (checkState === STATES.CAMERA_ACTIVE && videoRef.current && streamRef.current) {
      const video = videoRef.current
      try {
        video.srcObject = streamRef.current
      } catch (e) {
        console.error("Failed to set video srcObject:", e)
      }

      const tryPlay = async () => {
        try {
          await video.play()
        } catch (err) {
          // Autoplay might be blocked; user can still click capture which should work after allowing camera
          console.warn("Video play prevented:", err)
        }
      }

      // Ensure metadata is loaded before attempting to play to get videoWidth/videoHeight
      if (video.readyState >= 1) {
        tryPlay()
      } else {
        const onLoaded = () => {
          tryPlay()
          video.removeEventListener("loadedmetadata", onLoaded)
        }
        video.addEventListener("loadedmetadata", onLoaded)
      }
    }
  }, [checkState])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const handleSkip = () => {
    navigate("/dashboard")
  }

  const submitSelfie = async () => {
    if (!capturedImage) {
      setCameraError("No selfie captured.")
      return
    }
    try {
      // Send an object with selfieImage. The example supplied was a URL string,
      // here we pass the captured data URL; replace with an uploaded URL if needed.
      const payload = { selfieImage: capturedImage }
      await selfieVerification(payload)
      setShowSuccessModal(true)
    } catch (err) {
      console.error("Selfie verification failed:", err)
      setCameraError(err?.message || "Verification failed. Please try again.")
    }
  }

  const handleButtonClick = () => {
    switch (checkState) {
      case STATES.INITIAL:
        initializeCamera()
        break
      case STATES.CAMERA_ACTIVE:
        capturePhoto()
        break
      case STATES.PHOTO_CAPTURED:
        submitSelfie()
        break
      default:
        break
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    navigate("/dashboard")
  }

  const getButtonText = () => {
    if (loading) return "Processing..."
    switch (checkState) {
      case STATES.INITIAL:
        return "Start"
      case STATES.CAMERA_ACTIVE:
        return "Capture"
      case STATES.PHOTO_CAPTURED:
        return "Continue"
      default:
        return "Start"
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Liveness check</h1>
          <p className="text-muted-foreground">
            We will compare the photo in your document with your selfie to confirm your identity.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative aspect-[4/3] max-w-md mx-auto">
            {checkState === STATES.INITIAL ? (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                {cameraError || storeError ? (
                  <div className="text-center p-4">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{cameraError || storeError}</p>
                  </div>
                ) : (
                  <img
                    src="/Camera placeholder.png"
                    alt="Camera illustration"
                    className="object-cover"
                  />
                )}
              </div>
            ) : checkState === STATES.CAMERA_ACTIVE ? (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 z-10">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary" />
                </div>
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <img
                src={capturedImage}
                alt="Captured selfie"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleButtonClick} className="flex-1 bg-black hover:bg-black/90" disabled={!!cameraError || loading}>
              {getButtonText()}
            </Button>
            <Button variant="secondary" className="flex-1" onClick={handleSkip} disabled={loading}>
              Skip
            </Button>
          </div>
        </div>
      </div>
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </AuthLayout>
  )
}

export default LivenessCheck