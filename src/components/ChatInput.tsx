import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  language: string;
}

const placeholders = {
  en: "Type your message here...",
  hi: "यहाँ अपना संदेश लिखें...",
  raj: "यहाँ आपणो संदेश लिखो..."
};

export function ChatInput({ onSendMessage, disabled, language }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const placeholder = placeholders[language as keyof typeof placeholders] || placeholders.en;

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end p-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
      <div className="flex-1 relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[50px] max-h-[120px] resize-none pr-12 rounded-xl border-border/50 focus:border-primary/50 bg-background/80"
          rows={1}
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="absolute right-2 bottom-2 w-8 h-8 p-0 hover:bg-muted/50"
          disabled={disabled}
        >
          <Mic className="w-4 h-4" />
        </Button>
      </div>
      
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="hero-button h-[50px] px-6"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}