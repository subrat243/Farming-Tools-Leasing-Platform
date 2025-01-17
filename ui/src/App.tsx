import React, { useState } from 'react';
import { Tool, User, UserRole } from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthModal from '../src/components/AuthModel';
import ToolCard from './components/ToolCard';
import Footer from './components/Footer';
import { authenticateUser } from './utils/auth';
import { connectKeplr } from './utils/keplr';
import { getAllTools } from './data/tools';

export default function App() {
  const [tools, setTools] = useState<Tool[]>(getAllTools());
  const [user, setUser] = useState<User>({ name: '', email: '', isLoggedIn: false });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAuth = async (data: { name?: string; email: string; password: string; role: UserRole }) => {
    try {
      const authResult = await authenticateUser({ 
        email: data.email, 
        password: data.password,
        role: data.role
      });
      
      setUser({
        name: authResult.name,
        email: authResult.email,
        isLoggedIn: true,
        role: authResult.role
      });
      setIsAuthModalOpen(false);
    } catch (error) {
      if (data.role === 'admin') {
        alert('Invalid admin credentials. Please use admin@example.com / admin123');
      } else {
        alert('Invalid user credentials. Please use user@example.com / user123');
      }
    }
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', isLoggedIn: false, walletAddress: undefined, role: undefined });
  };

  const handleConnectWallet = async () => {
    try {
      const address = await connectKeplr();
      setUser(prev => ({ ...prev, walletAddress: address }));
    } catch (error) {
      alert('Failed to connect Keplr wallet. Please make sure you have the extension installed.');
    }
  };

  const handleRent = (tool: Tool) => {
    if (!user.isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    
    if (!user.walletAddress) {
      alert('Please connect your Keplr wallet first');
      return;
    }
    
    alert(`Tool "${tool.name}" rented successfully!`);
  };

  const handleToolAdded = (newTool: Tool) => {
    setTools(prevTools => [...prevTools, newTool]);
  };

  const handleToolDeleted = () => {
    setTools(getAllTools());
  };

  const promptAuth = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const promptWallet = () => {
    alert('Please connect your Keplr wallet first');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        onLogin={() => {
          setAuthMode('login');
          setIsAuthModalOpen(true);
        }}
        onSignup={() => {
          setAuthMode('signup');
          setIsAuthModalOpen(true);
        }}
        onConnectWallet={handleConnectWallet}
        onMenuClick={() => {
          if (!user.isLoggedIn) {
            promptAuth();
            return;
          }
          if (!user.walletAddress) {
            promptWallet();
            return;
          }
          setIsSidebarOpen(true);
        }}
      />
      
      <div className="flex-grow flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onToolAdded={handleToolAdded}
          isAuthenticated={user.isLoggedIn}
          hasWallet={!!user.walletAddress}
          isAdmin={user.role === 'admin'}
          onAuthNeeded={promptAuth}
          onWalletNeeded={promptWallet}
        />
        
        <main className="flex-grow lg:ml-64 p-4">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold text-center mb-2 text-white">
              FARM TOOLS RENTAL
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Professional farming equipment at your fingertips
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onRent={handleRent}
                  isAuthenticated={user.isLoggedIn}
                  hasWallet={!!user.walletAddress}
                  isAdmin={user.role === 'admin'}
                  onAuthNeeded={promptAuth}
                  onWalletNeeded={promptWallet}
                  onToolDeleted={handleToolDeleted}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSubmit={handleAuth}
      />
    </div>
  );
}