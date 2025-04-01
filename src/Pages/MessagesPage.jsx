import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Search, Paperclip, Send, Phone, Video, Smile } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar } from "../components/ui/avatar"
import { Separator } from "../components/ui/separator"

// Sample conversations data
const conversationsData = [
  {
    id: 1,
    name: "Brenda White",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: false,
    avatar: null,
  },
  {
    id: 2,
    name: "Misty Bins III",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: true,
    avatar: null,
  },
  {
    id: 3,
    name: "Misty Bins III",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: false,
    avatar: null,
  },
  {
    id: 4,
    name: "Misty Bins III",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: false,
    avatar: null,
  },
  {
    id: 5,
    name: "Misty Bins III",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: false,
    avatar: null,
  },
  {
    id: 6,
    name: "Misty Bins III",
    lastMessage: "Cursus id vitae quam vulputate tempus ut. Sit proin arcu nisl...",
    time: "12:00 PM",
    unread: false,
    avatar: null,
  },
]

// Sample messages data
const messagesData = [
  {
    id: 1,
    senderId: 101,
    text: "Hey, what's up? 😊",
    time: "08:15 PM",
    isMe: false,
  },
  {
    id: 2,
    senderId: 102,
    text: "Not much, just getting some work done. How about you?",
    time: "08:00 PM",
    isMe: true,
  },
  {
    id: 3,
    senderId: 101,
    text: "Same here, just finishing up a project. Do you have any plans for the weekend? 😊",
    time: "08:15 PM",
    isMe: false,
  },
  {
    id: 4,
    senderId: 102,
    text: "Not yet, but I was thinking of going for a hike. Want to join me?",
    time: "10:00 PM",
    isMe: true,
  },
  {
    id: 5,
    senderId: 101,
    text: "That sounds great! Which trail were you thinking of? 😊",
    time: "9:00 PM",
    isMe: false,
  },
]

function MessagesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")
  const [conversations, setConversations] = useState(conversationsData)
  const [messages, setMessages] = useState(messagesData)
  const [activeConversation, setActiveConversation] = useState(null)
  const messagesEndRef = useRef(null)

  // Set active conversation based on URL param
  useEffect(() => {
    if (id) {
      const conversation = conversations.find((c) => c.id === Number.parseInt(id))
      if (conversation) {
        setActiveConversation(conversation)
      }
    } else if (conversations.length > 0) {
      setActiveConversation(conversations[0])
    }
  }, [id, conversations])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      senderId: 102,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStartCall = () => {
    navigate(`/call/${activeConversation?.id}`)
  }

  const handleStartVideoCall = () => {
    navigate(`/video-call/${activeConversation?.id}`)
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${activeConversation?.id === conversation.id ? "bg-gray-50" : ""}`}
              onClick={() => {
                setActiveConversation(conversation)
                navigate(`/messages/${conversation.id}`)
              }}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  {conversation.avatar ? (
                    <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  ) : (
                    <div className="bg-orange-500 w-full h-full flex items-center justify-center">
                      <span className="text-white font-medium">{conversation.name.charAt(0)}</span>
                    </div>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate">{conversation.name}</div>
                    <div className="text-xs text-muted-foreground">{conversation.time}</div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                {activeConversation.avatar ? (
                  <img src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                ) : (
                  <div className="bg-orange-500 w-full h-full flex items-center justify-center">
                    <span className="text-white font-medium">{activeConversation.name.charAt(0)}</span>
                  </div>
                )}
              </Avatar>
              <div>
                <div className="font-medium">{activeConversation.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleStartCall}>
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleStartVideoCall}>
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              // Check if this is the first message of the day or if the date changed
              const messageDate = new Date().toLocaleDateString()
              const showDateSeparator = index === 0 || messageDate !== new Date().toLocaleDateString()

              return (
                <div key={msg.id}>
                  {showDateSeparator && (
                    <div className="flex items-center justify-center my-4">
                      <Separator className="flex-grow" />
                      <span className="mx-2 text-xs text-muted-foreground">Today</span>
                      <Separator className="flex-grow" />
                    </div>
                  )}

                  <div className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-end gap-2 max-w-[70%]">
                      {!msg.isMe && (
                        <Avatar className="w-8 h-8">
                          <div className="bg-orange-500 w-full h-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">{activeConversation.name.charAt(0)}</span>
                          </div>
                        </Avatar>
                      )}

                      <div>
                        <div
                          className={`p-3 rounded-lg ${
                            msg.isMe ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{msg.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <Button
                variant="default"
                size="icon"
                onClick={handleSendMessage}
                disabled={message.trim() === ""}
                className="bg-black hover:bg-black/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesPage

