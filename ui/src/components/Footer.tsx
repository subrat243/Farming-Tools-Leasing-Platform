import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-[#ff1f71]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 neon-text">About FarmTools</h3>
            <p className="text-gray-400">
              Revolutionizing farming through accessible equipment rentals. Making modern agriculture tools available to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 neon-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#ff1f71]">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ff1f71]">Tools Catalog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ff1f71]">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ff1f71]">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 neon-text">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-[#ff1f71]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-[#ff1f71]" />
                <span>support@farmtools.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-[#ff1f71]" />
                <span>123 Farming Street, AG City</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 neon-text">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#ff1f71]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ff1f71]">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ff1f71]">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} FarmTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;