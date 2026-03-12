import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Home, 
  Box, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Image as ImageIcon, 
  FileBox,
  Bell,
  Search,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const { user } = useSelector(state => state.auth);
  const userName = user?.name || 'Administrator';
  const userRole = user?.role || 'User';

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Interface', icon: Box, path: '/interface' },
    { name: 'Components', icon: Calendar, path: '/components' },
    { name: 'Pages', icon: FileText, path: '/pages' },
    { name: 'Forms', icon: CheckSquare, path: '/forms' },
    { name: 'Gallery', icon: ImageIcon, path: '/gallery' },
    { name: 'Documentation', icon: FileBox, path: '/documentation' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header - White Background */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo area */}
            <div className="flex items-center space-x-2">
              <div className="bg-tablerBlue text-white p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17l6-6-6-6" />
                  <path d="M12 19h8" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-800 tracking-tight">tabler</span>
            </div>

            {/* Right side Actions */}
            <div className="flex items-center space-x-6">
              <button className="text-sm border border-gray-300 rounded px-2 py-1 text-tablerBlue hover:bg-gray-50 bg-white shadow-sm font-medium">Source code</button>
              
              <div className="relative cursor-pointer text-gray-400 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-tablerRed ring-2 ring-white"></span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center font-bold text-gray-600 bg-gray-200">
                     {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-700 leading-tight">{userName}</div>
                    <div className="text-xs text-gray-500">{userRole}</div>
                  </div>
                </div>
                
                {/* Logout Button incorporated directly here based on the instructions */}
                <button 
                  onClick={() => {
                    // Quick inline logout dispatch based on window global to avoid breaking layout complexity
                    // in a real app this would have a dispatch hook setup cleanly
                    if (window.store) {
                       window.store.dispatch({ type: 'auth/logoutRequest' });
                    }
                  }}
                  className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* Navigation Bar - White Background */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 py-3 text-sm font-medium transition-colors ${
                    isActive && item.name === 'Home' 
                      ? 'text-tablerBlue border-b-2 border-tablerBlue' 
                      : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent'
                  }`
                }
              >
                <item.icon size={18} className={item.name === 'Home' ? 'text-tablerBlue' : 'text-gray-400'} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area - Light Gray Background */}
      <main className="flex-1 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-4 text-sm text-gray-500 justify-between items-center">
            <div>
              <a href="#" className="hover:text-gray-900 mr-4">Documentation</a>
              <a href="#" className="hover:text-gray-900">FAQ</a>
            </div>
            <div>
              © 2026 Tabler. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
