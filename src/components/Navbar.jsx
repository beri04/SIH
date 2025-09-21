import React from "react";
import { Home, FileText, BarChart, Upload, Settings, Bell } from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home className="h-5 w-5" /> },
  { name: "About Neantran" },
  { name: "Reports", icon: <FileText className="h-5 w-5" /> },
  { name: "Trends", icon: <BarChart className="h-5 w-5" /> },
  { name: "Upload Image", icon: <Upload className="h-5 w-5" /> },
  // Optional: extra features
  { name: "Notifications", icon: <Bell className="h-5 w-5" /> },
  { name: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const NavBar = () => {
  return (
    <nav className="w-full bg-[#3c437c] dark:bg-gray-900 px-4 py-2 flex justify-center">
      <ul className="flex items-center gap-6">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center gap-1 text-white hover:text-gray-200 cursor-pointer">
              {item.icon && <span>{item.icon}</span>}
              <span className="hidden sm:inline">{item.name}</span>
            </li>
            {index < navItems.length - 1 && (
              <span className="h-5 border-l border-gray-400"></span> // vertical separator
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
