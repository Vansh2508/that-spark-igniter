import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Mock responses for different languages
const mockResponses = {
  en: [
    "I'd be happy to help you with that! Here's what I can tell you about educational opportunities in Rajasthan...",
    "That's a great question! Let me provide you with detailed information about government schemes and services...",
    "Based on your query, here are the steps you need to follow for the application process...",
    "I understand your concern. Here's comprehensive guidance on this topic..."
  ],
  hi: [
    "मुझे आपकी सहायता करने में खुशी होगी! राजस्थान में शैक्षणिक अवसरों के बारे में यहाँ जानकारी है...",
    "यह एक बेहतरीन प्रश्न है! मैं आपको सरकारी योजनाओं और सेवाओं की विस्तृत जानकारी प्रदान करता हूँ...",
    "आपके प्रश्न के आधार पर, आवेदन प्रक्रिया के लिए यहाँ चरण दिए गए हैं...",
    "मैं आपकी चिंता समझता हूँ। इस विषय पर यहाँ व्यापक मार्गदर्शन है..."
  ],
  raj: [
    "मनै आपरी सहायता करण में खुशी होसी! राजस्थान में शैक्षणिक अवसरां रे बारे में यां जानकारी है...",
    "यो एक बहुत बढ़िया सवाल है! हूं आपनै सरकारी योजनाओं अर सेवाओं री विस्तृत जानकारी देता हूं...",
    "आपरे सवाल रे आधार पर, आवेदन प्रक्रिया खातर यां चरण दिए गए हैं...",
    "हूं आपरी चिंता समझता हूं। इस विषय पर यां व्यापक मार्गदर्शन है..."
  ]
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const responses = mockResponses[language as keyof typeof mockResponses] || mockResponses.en;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleExampleClick = (example: string) => {
    handleSendMessage(example);
  };

  const clearChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  const showWelcome = messages.length === 0 && !isTyping;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Smart Education Bot</h1>
              <p className="text-sm text-muted-foreground">Government of Rajasthan</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearChat} className="rounded-xl">
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
            )}
            <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {showWelcome ? (
          <WelcomeScreen language={language} onExampleClick={handleExampleClick} />
        ) : (
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          language={language}
        />
      </div>
    </div>
  );
}