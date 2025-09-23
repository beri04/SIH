import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, BarChart, Upload, Settings, Bell } from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home className="h-5 w-5" />, path: "/",  },
  { name: "About Niyantran", path: "/about"},
  { name: "Reports", icon: <FileText className="h-5 w-5" />, path: "/reports" },
  { name: "Trends", icon: <BarChart className="h-5 w-5" />, path: "/trends" },
  { name: "Upload Image", icon: <Upload className="h-5 w-5" />, path: "/upload" },
  { name: "Notifications", icon: <Bell className="h-5 w-5" />, path: "/notifications" },
  { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-[#3c437c] dark:bg-gray-900 px-4 py-2 flex justify-center">
      <ul className="flex items-center gap-6">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <Link
                to={item.path || "#"}
                className={`flex items-center gap-1 text-white hover:text-gray-200 transition ${
                  location.pathname === item.path ? "font-bold " : ""
                }`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </li>

            {index < navItems.length - 1 && (
              <span className="h-5 border-l border-gray-400" /> // <-- comment removed from here
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;



