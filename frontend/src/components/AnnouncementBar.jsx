import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const AnnouncementBar = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden h-[7vh] flex justify-between items-center bg-[#3c437c] px-4 py-2 font-sans">
      {/* Left Text */}
      <p className="text-sm text-white truncate">
        🚨 Welcome to Legal Metrology Officer Dashboard
      </p>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />

        {/* Avatar + Welcome */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Officer" />
            <AvatarFallback>OF</AvatarFallback>
          </Avatar>
          <span className="text-sm text-white">{t("welcome")}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
