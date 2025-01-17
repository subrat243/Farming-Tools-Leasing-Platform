import React, { useState } from 'react';
import {
  Home,
  Wrench,
  History,
  Plus,
  X,
  Trash2
} from 'lucide-react';
import { addTool } from '../data/tools';
import { Tool } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToolAdded: (tool: Tool) => void;
  isAuthenticated: boolean;
  hasWallet: boolean;
  isAdmin: boolean;
  onAuthNeeded: () => void;
  onWalletNeeded: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onToolAdded,
  isAuthenticated,
  hasWallet,
  isAdmin,
  onAuthNeeded,
  onWalletNeeded
}) => {
  const [showAddTool, setShowAddTool] = useState(false);
  const [newTool, setNewTool] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    minDays: '1',
    maxDays: '30',
    lenderName: '',
    lenderContact: ''
  });

  const userMenuItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Wrench, label: 'My Rentals', href: '#' },
    { icon: History, label: 'Rental History', href: '#' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Wrench, label: 'Manage Tools', href: '#', onClick: () => setShowAddTool(true) },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onAuthNeeded();
      return;
    }

    if (!hasWallet) {
      onWalletNeeded();
      return;
    }

    if (!isAdmin) {
      alert('Only admins can add new tools');
      return;
    }

    const tool = addTool({
      name: newTool.name,
      description: newTool.description,
      pricePerDay: parseFloat(newTool.price),
      image: newTool.image,
      category: newTool.category,
      available: true,
      rentalPeriod: {
        minDays: parseInt(newTool.minDays),
        maxDays: parseInt(newTool.maxDays)
      },
      lenderInfo: {
        name: newTool.lenderName,
        contact: newTool.lenderContact
      }
    });
    
    onToolAdded(tool);
    setNewTool({ 
      name: '', 
      price: '', 
      description: '', 
      image: '', 
      category: '',
      minDays: '1',
      maxDays: '30',
      lenderName: '',
      lenderContact: ''
    });
    alert('Tool added successfully!');
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onAuthNeeded();
      return;
    }
    if (!hasWallet) {
      onWalletNeeded();
      return;
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  if (!isAuthenticated || !hasWallet) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-50
        border-r border-[#ff1f71] overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4">
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-[#ff1f71] hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8 mt-8">
            <h3 className="text-lg font-semibold mb-4 text-[#ff1f71]">
              {isAdmin ? 'Admin Menu' : 'User Menu'}
            </h3>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleMenuClick(e, item)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-[#ff1f71]" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {isAdmin && showAddTool && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2 text-[#ff1f71]">
                  <Plus className="h-5 w-5" />
                  <span>Add New Tool</span>
                </h3>
                <button
                  onClick={() => setShowAddTool(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    value={newTool.name}
                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Price per Day (IST)
                  </label>
                  <input
                    type="number"
                    value={newTool.price}
                    onChange={(e) => setNewTool({ ...newTool, price: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newTool.category}
                    onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTool.description}
                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Min Rental Days
                    </label>
                    <input
                      type="number"
                      value={newTool.minDays}
                      onChange={(e) => setNewTool({ ...newTool, minDays: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Max Rental Days
                    </label>
                    <input
                      type="number"
                      value={newTool.maxDays}
                      onChange={(e) => setNewTool({ ...newTool, maxDays: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                      min={newTool.minDays}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Lender Name
                  </label>
                  <input
                    type="text"
                    value={newTool.lenderName}
                    onChange={(e) => setNewTool({ ...newTool, lenderName: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Lender Contact
                  </label>
                  <input
                    type="text"
                    value={newTool.lenderContact}
                    onChange={(e) => setNewTool({ ...newTool, lenderContact: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newTool.image}
                    onChange={(e) => setNewTool({ ...newTool, image: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#ff1f71] focus:ring-1 focus:ring-[#ff1f71]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full neon-button py-2 px-4 rounded-lg"
                >
                  Add Tool
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;