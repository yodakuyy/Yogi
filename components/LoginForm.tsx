import React, { useState } from 'react';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { MicrosoftLogo } from './Icons';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
    // Simulate login validation
    if (email && password) {
        onLoginSuccess();
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Logo */}
      <div className="mb-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <Zap size={20} fill="currentColor" />
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-500 text-sm">See your growth and get consulting support!</p>
      </div>

      {/* Social Login */}
      <button 
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full py-2.5 px-4 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-gray-700"
      >
        <MicrosoftLogo className="w-5 h-5" />
        <span>Sign in with Microsoft</span>
      </button>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-300 text-xs font-medium">or Sign in with Email</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="mail@website.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password*
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-sm pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600 font-medium">Remember me</span>
          </label>
          <a href="#" className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
            Forget password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};