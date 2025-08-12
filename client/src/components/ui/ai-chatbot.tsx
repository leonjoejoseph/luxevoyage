import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  "View luxury packages",
  "Book a consultation", 
  "Check availability",
  "Request custom itinerary",
  "Contact travel expert"
];

const botResponses = {
  greeting: "Welcome to LuxeVoyage! ✈️ I'm your luxury travel assistant. How can I help you plan your perfect getaway today?",
  packages: "Our luxury packages include private tours, vacation suites, and exclusive destinations. Would you like me to show you our most popular options?",
  booking: "I'd be happy to help you book a consultation with our travel experts. They can create a personalized luxury itinerary just for you.",
  availability: "Let me check our availability for you. Which destination and dates are you interested in?",
  custom: "Our travel experts specialize in custom luxury itineraries. We can arrange everything from private jets to exclusive accommodations.",
  contact: "You can reach our luxury travel experts at +965 2222 9999 or luxevoyage@deepyinc.com. They're available 24/7 for your convenience.",
  default: "I'm here to help with all your luxury travel needs! Ask me about our packages, bookings, or custom itineraries."
};

function generateBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('package') || message.includes('tour') || message.includes('destination')) {
    return botResponses.packages;
  }
  if (message.includes('book') || message.includes('consultation') || message.includes('appointment')) {
    return botResponses.booking;
  }
  if (message.includes('availability') || message.includes('available') || message.includes('date')) {
    return botResponses.availability;
  }
  if (message.includes('custom') || message.includes('personalized') || message.includes('itinerary')) {
    return botResponses.custom;
  }
  if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('expert')) {
    return botResponses.contact;
  }
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return botResponses.greeting;
  }
  
  return botResponses.default;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: botResponses.greeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-luxury rounded-full shadow-2xl flex items-center justify-center text-navy-deep hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        data-testid="chatbot-toggle"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: isMinimized ? 100 : 0, 
              scale: isMinimized ? 0.8 : 1 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px]"
          >
            <GlassmorphismCard className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-navy-deep" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-deep">LuxeVoyage Assistant</h3>
                    <p className="text-xs text-gray-600">Luxury travel support</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={minimizeChat}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={toggleChat}
                    variant="ghost"
                    size="sm" 
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-luxury text-navy-deep'
                              : 'bg-navy-deep/10 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-navy-deep/10 p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  <div className="p-4 border-t border-white/20">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs px-3 py-1 bg-navy-deep/10 hover:bg-gold-accent hover:text-navy-deep rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about luxury travel..."
                        className="flex-1 bg-white/90 border-white/20 text-black"
                        data-testid="chatbot-input"
                      />
                      <Button
                        onClick={() => handleSendMessage()}
                        className="bg-gradient-luxury hover:bg-gradient-luxury/90 text-navy-deep"
                        size="sm"
                        data-testid="chatbot-send"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}