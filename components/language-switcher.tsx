

"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const getLanguages = (isHydrated: boolean) => [
  { code: "en", name: isHydrated ? "common.languages.english" : "English" },
  { code: "zh", name: isHydrated ? "common.languages.chinese" : "中文" },
];

export function LanguageSwitcher() {
  const [isHydrated, setIsHydrated] = useState(false);


  const handleLanguageChange = () => {

  };

  const languages = getLanguages(isHydrated);
  const currentLanguage = languages.find(lang => lang.code === "en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {isHydrated ? (
            <span>
              {currentLanguage?.name}
            </span>
          ) : (
            <span>
              {"common.languages.english"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange()}
            className={`cursor-pointer ${"en" === language.code ? "bg-accent" : ""
              }`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
