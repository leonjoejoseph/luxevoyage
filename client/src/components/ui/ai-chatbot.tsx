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

async function generateBotResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        context: "You are a luxury travel assistant for LuxeVoyage."
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

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

  const handleRatingSubmit = async () => {
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
      
      setShowRating(false);
      setChatRating({ rating: 0, feedback: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gold-accent hover:bg-gold-accent/90 text-navy-deep shadow-lg ml-[630px] mr-[630px]"
          data-testid="button-open-chat"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <GlassmorphismCard className={`${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'} transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-gold-accent" />
            <h3 className="font-semibold text-gray-800 text-lg">Luxury Chat Support</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMinimize}
              className="hover:bg-white/20"
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChatbot}
              className="hover:bg-white/20"
              data-testid="button-close-chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gold-accent text-navy-deep'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs bg-white/50 hover:bg-white/80 border-gold-accent text-gray-700"
                      data-testid={`button-quick-reply-${index}`}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about luxury travel..."
                  className="flex-1 bg-white/50 border-gold-accent focus:border-gold-accent"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="sm"
                  className="bg-gold-accent hover:bg-gold-accent/90 text-navy-deep"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-xs text-gray-600 mt-2 text-center">
                <span className="font-medium text-gray-800">Need assistance? Contact us at</span> luxevoyage25@gmail.com
              </div>
            </div>

            {/* Rating Section */}
            {showRating && (
              <div className="p-4 border-t border-white/20 bg-white/10">
                <h4 className="font-medium mb-2">Rate your experience</h4>
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setChatRating(prev => ({ ...prev, rating: star }))}
                      className={`${
                        star <= chatRating.rating ? 'text-gold-accent' : 'text-gray-300'
                      }`}
                      data-testid={`button-rating-${star}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
                <Input
                  value={chatRating.feedback}
                  onChange={(e) => setChatRating(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="Additional feedback (optional)"
                  className="mb-2 bg-white/50"
                  data-testid="input-chat-feedback"
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={handleRatingSubmit}
                    size="sm"
                    className="bg-gold-accent hover:bg-gold-accent/90 text-navy-deep"
                    data-testid="button-submit-rating"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => setShowRating(false)}
                    variant="outline"
                    size="sm"
                    data-testid="button-cancel-rating"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Rating Trigger */}
            {!showRating && messages.length > 3 && (
              <div className="px-4 pb-2">
                <Button
                  onClick={() => setShowRating(true)}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-white/50 hover:bg-white/80"
                  data-testid="button-show-rating"
                >
                  ⭐ Rate your experience
                </Button>
              </div>
            )}
          </>
        )}
      </GlassmorphismCard>
    </motion.div>
  );
}