import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1C2C] text-gray-200 mt-10 relative">
      {/* Tricolor Strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        
        {/* Ministry Branding */}
        <div>
          <img 
            src="/ministry-logo.png" 
            alt="Ministry Logo" 
            className="w-20 mb-3"
          />
          <h2 className="text-white text-lg font-semibold">
            Legal Metrology Compliance Portal
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            Powered by AI | Ministry of Consumer Affairs
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Important Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About the Portal</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/feedback" className="hover:text-white">Feedback</a></li>
            <li><a href="/rti" className="hover:text-white">RTI / Citizen Charter</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>compliance-support@nic.in</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>+91-1800-123-456</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Krishi Bhavan, New Delhi, India</span>
          </div>
        </div>
      </div>

      {/* Disclaimer & CopyRight */}
      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        This is a beta version of the AI-powered compliance checker. | Last updated: {new Date().toLocaleDateString()}
        <br />
        © {new Date().getFullYear()} Ministry of Consumer Affairs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
