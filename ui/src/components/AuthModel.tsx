import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string; role: UserRole }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password, role });
    setName('');
    setEmail('');
    setPassword('');
    setRole('user');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md relative border border-[#ff1f71]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">
          {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-[#ff1f71] focus:ring-[#ff1f71]"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-[#ff1f71] focus:ring-[#ff1f71]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-[#ff1f71] focus:ring-[#ff1f71]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-[#ff1f71] focus:ring-[#ff1f71]"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full neon-button py-2 px-4 rounded-md"
          >
            {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
          </button>

          {mode === 'login' && (
            <div className="mt-4 text-sm text-gray-400">
              <p>Test Credentials:</p>
              <p>User - user@example.com / user123</p>
              <p>Admin - admin@example.com / admin123</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;