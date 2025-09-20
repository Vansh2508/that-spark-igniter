import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "raj", name: "Rajasthani", nativeName: "राजस्थानी" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-border/50 hover:border-primary/50 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{selectedLang.nativeName}</span>
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 z-50 p-2 min-w-[160px] shadow-lg border-border/50">
          <div className="space-y-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
                className={`language-chip w-full text-left ${
                  language.code === selectedLanguage ? "active" : ""
                }`}
              >
                <div className="font-medium">{language.nativeName}</div>
                <div className="text-xs opacity-70">{language.name}</div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}