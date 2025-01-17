import React from 'react';
import { Menu, LogOut, Wallet } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onConnectWallet: () => void;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLogout, 
  onLogin, 
  onSignup,
  onConnectWallet,
  onMenuClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-black border-b border-[#ff1f71] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="text-[#ff1f71] hover:text-white transition-colors group"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-current transition-all group-hover:w-5"></div>
              <div className="w-4 h-0.5 bg-current transition-all group-hover:w-6"></div>
              <div className="w-5 h-0.5 bg-current transition-all group-hover:w-4"></div>
            </div>
          </button>
          <span className="text-xl font-bold neon-text">FarmTools</span>
        </div>
        
        {user.isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {!user.walletAddress && (
              <button
                onClick={onConnectWallet}
                className="flex items-center space-x-2 neon-button px-4 py-2 rounded-lg"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 neon-button px-4 py-2 rounded-lg"
              >
                <span>{user.name}</span>
                {user.walletAddress && (
                  <span className="text-sm">
                    ({user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)})
                  </span>
                )}
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 text-white border border-[#ff1f71]">
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <button 
              onClick={onLogin}
              className="neon-button px-4 py-2 rounded-lg"
            >
              Login
            </button>
            <button 
              onClick={onSignup}
              className="neon-button px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;