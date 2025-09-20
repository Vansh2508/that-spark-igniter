import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, GraduationCap, MessageCircle } from "lucide-react";

interface WelcomeScreenProps {
  language: string;
  onExampleClick: (example: string) => void;
}

const welcomeData = {
  en: {
    title: "Language Agnostic Chatbot",
    subtitle: "Smart Education Assistant for Government of Rajasthan",
    description: "Ask me anything about education, government services, or get help in your preferred language.",
    examples: [
      "How can I apply for scholarships?",
      "Tell me about educational schemes in Rajasthan",
      "What are the admission requirements?",
      "Help me with career guidance"
    ]
  },
  hi: {
    title: "भाषा स्वतंत्र चैटबॉट",
    subtitle: "राजस्थान सरकार का स्मार्ट शिक्षा सहायक",
    description: "शिक्षा, सरकारी सेवाओं के बारे में कुछ भी पूछें या अपनी पसंदीदा भाषा में सहायता प्राप्त करें।",
    examples: [
      "छात्रवृत्ति के लिए आवेदन कैसे करें?",
      "राजस्थान में शैक्षणिक योजनाओं के बारे में बताएं",
      "प्रवेश की आवश्यकताएं क्या हैं?",
      "करियर गाइडेंस में मदद करें"
    ]
  },
  raj: {
    title: "भाषा स्वतंत्र चैटबॉट",
    subtitle: "राजस्थान सरकार रो स्मार्ट शिक्षा सहायक",
    description: "शिक्षा, सरकारी सेवावां रे बारे में कुछ भी पूछो या आपणी पसंदीदा भाषा में सहायता लो।",
    examples: [
      "छात्रवृत्ति खातर आवेदन कैसे करां?",
      "राजस्थान में शैक्षणिक योजनावां रे बारे में बताओ",
      "प्रवेश री आवश्यकताएं के हैं?",
      "करियर गाइडेंस में मदद करो"
    ]
  }
};

export function WelcomeScreen({ language, onExampleClick }: WelcomeScreenProps) {
  const content = welcomeData[language as keyof typeof welcomeData] || welcomeData.en;

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6">
      <div className="text-center mb-12 max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-md">
              <Globe className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          {content.title}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
          {content.subtitle}
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {content.examples.map((example, index) => (
          <Card
            key={index}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 group"
            onClick={() => onExampleClick(example)}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {index === 0 && <GraduationCap className="w-5 h-5 text-primary" />}
                {index === 1 && <BookOpen className="w-5 h-5 text-primary" />}
                {index === 2 && <MessageCircle className="w-5 h-5 text-primary" />}
                {index === 3 && <Globe className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {example}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' && "Powered by Government of Rajasthan • Smart India Hackathon 2025"}
          {language === 'hi' && "राजस्थान सरकार द्वारा संचालित • स्मार्ट इंडिया हैकथॉन 2025"}
          {language === 'raj' && "राजस्थान सरकार द्वारा संचालित • स्मार्ट इंडिया हैकथॉन 2025"}
        </p>
      </div>
    </div>
  );
}