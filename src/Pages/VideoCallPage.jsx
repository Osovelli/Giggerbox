import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Maximize2, Share, PhoneOff, Video, Settings, Mic, MicOff, VideoOff } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar } from "../components/ui/avatar"
import { Slider } from "../components/ui/slider"

function VideoCallPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [participants, setParticipants] = useState([
    { id: 1, name: "Olowu Abayomi", avatar: null, isMe: true },
    { id: 2, name: "John Doe", avatar: null, isMe: false },
  ])

  // Update call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleEndCall = () => {
    navigate(-1)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
  }

  return (
    <div className="relative h-screen bg-gray-900 text-white">
      {/* Main video */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Container%20%2811%29-OdsbkwUa3N6FMlFF0naIWcZrkf8MaZ.png"
          alt="Video call"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Call duration */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm">
        {formatDuration(callDuration)}
      </div>

      {/* Participants */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {participants
          .filter((p) => !p.isMe)
          .map((participant) => (
            <div
              key={participant.id}
              className="w-16 h-16 rounded-lg overflow-hidden bg-pink-400 flex items-center justify-center"
            >
              {participant.avatar ? (
                <img
                  src={participant.avatar || "/placeholder.svg"}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold">{participant.name.charAt(0)}</span>
              )}
            </div>
          ))}
      </div>

      {/* Call controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 border-0 backdrop-blur-sm hover:bg-white/20"
          onClick={() => {}}
        >
          <Maximize2 className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 border-0 backdrop-blur-sm hover:bg-white/20"
          onClick={() => {}}
        >
          <Share className="h-6 w-6" />
        </Button>

        <Button variant="destructive" size="icon" className="rounded-full h-14 w-14" onClick={handleEndCall}>
          <PhoneOff className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`rounded-full backdrop-blur-sm ${
            isVideoOff ? "bg-white/30 hover:bg-white/40" : "bg-white/10 border-0 hover:bg-white/20"
          }`}
          onClick={toggleVideo}
        >
          {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`rounded-full backdrop-blur-sm ${
            isMuted ? "bg-white/30 hover:bg-white/40" : "bg-white/10 border-0 hover:bg-white/20"
          }`}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 border-0 backdrop-blur-sm hover:bg-white/20"
          onClick={() => {}}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Volume slider */}
      <div className="absolute bottom-8 left-8 h-32 flex flex-col items-center">
        <Slider defaultValue={[80]} max={100} step={1} orientation="vertical" className="h-full" />
      </div>

      {/* User info */}
      <div className="absolute bottom-8 left-8">
        <div className="flex items-center gap-2">
          <Avatar>
            <div className="bg-green-500 w-full h-full flex items-center justify-center">
              <span className="text-white font-medium">OA</span>
            </div>
          </Avatar>
          <div className="text-sm">Olowu Abayomi</div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallPage

