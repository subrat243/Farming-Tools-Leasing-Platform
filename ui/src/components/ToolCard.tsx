import React from 'react';
import { Tool } from '../types';
import { Trash2, Clock } from 'lucide-react';
import { deleteTool } from '../data/tools';

interface ToolCardProps {
  tool: Tool;
  onRent: (tool: Tool) => void;
  isAuthenticated: boolean;
  hasWallet: boolean;
  isAdmin: boolean;
  onAuthNeeded: () => void;
  onWalletNeeded: () => void;
  onToolDeleted?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  onRent,
  isAuthenticated,
  hasWallet,
  isAdmin,
  onAuthNeeded,
  onWalletNeeded,
  onToolDeleted
}) => {
  const handleRentClick = () => {
    if (!isAuthenticated) {
      onAuthNeeded();
      return;
    }
    if (!hasWallet) {
      onWalletNeeded();
      return;
    }
    onRent(tool);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      deleteTool(tool.id);
      onToolDeleted?.();
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#ff1f71] transition-colors">
      <div className="relative">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-48 object-cover"
        />
        {isAdmin && (
          <button
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
          <span className="text-sm text-gray-400">{tool.category}</span>
        </div>
        <p className="text-gray-400 mt-1">{tool.description}</p>
        
        <div className="mt-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>
              Rental period: {tool.rentalPeriod.minDays}-{tool.rentalPeriod.maxDays} days
            </span>
          </div>
          <div className="mt-1">
            Lender: {tool.lenderInfo.name}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-[#ff1f71] font-bold">
            {tool.pricePerDay} IST/day
          </span>
          {!isAdmin && (
            <button
              onClick={handleRentClick}
              className={`px-4 py-2 rounded-lg ${
                tool.available
                  ? 'neon-button'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!tool.available}
            >
              {tool.available ? 'Rent Now' : 'Not Available'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;