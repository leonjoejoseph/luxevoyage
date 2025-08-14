import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2, Star, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Instagram, Twitter } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatRating {
  rating: number;
  feedback: string;
}

const quickReplies = [
  "View luxury packages",
  "Book a consultation", 
  "Check availability",
  "Request custom itinerary",
  "Contact travel expert"
];

// Company context for the AI assistant
const COMPANY_CONTEXT = `
You are a luxury travel assistant for LuxeVoyage, a premium travel agency. You are trained to provide helpful information about luxury travel destinations, high-end accommodations, exclusive experiences, and personalized travel planning.

IMPORTANT: You MUST only answer travel-related questions. If a question is not related to travel, respond EXACTLY with: "Out of topic Question"

Travel-related topics you can help with:
- Luxury destinations and hotels
- Travel planning and itineraries
- Flight recommendations
- Cultural experiences and activities
- Fine dining and restaurants
- Travel tips and advice
- Weather and best travel times
- Travel packages and pricing
- Visa and travel requirements
- Luxury transportation options

LuxeVoyage offers exclusive packages including:
- Maldives Ocean Villa Experience ($4,299)
- Swiss Alpine Luxury Experience ($3,899) 
- Angkor Wonder ($1,899)
- Japan Private Ryokan Experience ($11,299)
- Antarctica Luxury Expedition ($28,999)
- Iceland Northern Lights ($6,299)
- Bali Private Villa Retreat ($8,599)
- Norway Fjords Explorer ($9,299)

For any non-travel questions (technology, politics, general knowledge, etc.), respond EXACTLY with: "Out of topic Question"

Contact information: luxevoyage25@gmail.com
Our experts are available 24/7 for luxury travel consultation.`;

async function generateBotResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        context: COMPANY_CONTEXT
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('AI Chat Error:', error);
    return "I apologize, but I'm experiencing technical difficulties. Please contact our travel experts directly at luxevoyage25@gmail.com for immediate assistance.";
  }
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [chatRating, setChatRating] = useState<ChatRating>({ rating: 0, feedback: '' });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to LuxeVoyage! ✈️ I'm your luxury travel assistant. How can I help you plan your perfect getaway today?",
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

    // Get AI response
    try {
      const responseText = await generateBotResponse(messageText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please contact our travel experts directly at luxevoyage25@gmail.com for immediate assistance.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleChat = () => {
    if (isOpen && !showRating) {
      setShowRating(true);
    } else {
      setIsOpen(!isOpen);
      setIsMinimized(false);
      setShowRating(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const submitRating = async () => {
    try {
      await fetch('/api/chat/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: chatRating.rating,
          feedback: chatRating.feedback,
          messages: messages
        }),
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }

    setIsOpen(false);
    setShowRating(false);
    setChatRating({ rating: 0, feedback: '' });
    setMessages([{
      id: '1',
      text: "Welcome to LuxeVoyage! ✈️ I'm your luxury travel assistant. How can I help you plan your perfect getaway today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-luxury rounded-full shadow-2xl flex items-center justify-center text-navy-deep hover:scale-110 transition-transform"
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
            className="fixed bottom-24 left-6 z-50 w-96 h-[500px]"
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
                    <p className="text-xs text-navy-deep-600">Luxury Chat Support</p>
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

              {!isMinimized && !showRating && (
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
                          className="text-xs px-3 py-1 bg-gold-accent text-navy-deep hover:bg-gold-accent hover:text-navy-deep rounded-full transition-all duration-300 hover:underline decoration-2 underline-offset-2"
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

              {/* Rating Interface */}
              {!isMinimized && showRating && (
                <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-lg font-semibold text-navy-deep">Rate Your Experience</h3>

                  {/* Star Rating */}
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setChatRating({ ...chatRating, rating: star })}
                        className="text-2xl transition-colors"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= chatRating.rating 
                              ? 'text-gold-accent fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>

                  {/* Feedback Input */}
                  <Input
                    value={chatRating.feedback}
                    onChange={(e) => setChatRating({ ...chatRating, feedback: e.target.value })}
                    placeholder="Optional feedback..."
                    className="w-full bg-white/90 border-white/20"
                  />

                  {/* Social Links */}
                  <div className="flex items-center space-x-4 mt-4">
                    <p className="text-sm text-gray-600">Follow us:</p>
                    <a
                      href="https://www.instagram.com/luxe_voyage25/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-accent hover:text-navy-deep transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://x.com/luxevoyage25"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-accent hover:text-navy-deep transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Contact Info */}
                  <p className="text-sm text-gray-600 text-center">
                    Need assistance? Contact us at <br/>
                    <span className="text-gold-accent">luxevoyage25@gmail.com</span>
                  </p>

                  {/* Submit Button */}
                  <Button
                    onClick={submitRating}
                    className="bg-gradient-luxury hover:bg-gradient-luxury/90 text-navy-deep w-full"
                    disabled={chatRating.rating === 0}
                  >
                    Submit & Close
                  </Button>
                </div>
              )}
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}