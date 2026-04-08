import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare, LogIn, LogOut, LayoutDashboard, Home, Info, Briefcase, Users, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About Us', path: '/about', icon: Info },
  { name: 'Services', path: '/services', icon: Briefcase },
  { name: 'Careers', path: '/careers', icon: Users },
  { name: 'Courses', path: '/courses', icon: BookOpen },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, openAuthModal, logout } = useAuth();

  const handleSignIn = () => {
    openAuthModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 pt-4 md:pt-6 px-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none">
        <div className="w-full max-w-5xl pointer-events-auto">
          <div className="bg-[#0A111F]/80 backdrop-blur-xl border border-white/5 rounded-full px-4 md:px-6 py-3 flex justify-between items-center shadow-2xl">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-lg md:text-xl font-bold tracking-tight text-white font-display">
                Bismahsoft Ltd.
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand ${
                    location.pathname === link.path ? 'text-brand' : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Contact & Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4 shrink-0">
              {/* Auth minimized temporarily due to database issues */}
              {/* user ? (...) : (...) */}

              <Link
                to="/contact"
                className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 shadow-lg shadow-brand/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden shrink-0">
              <button
                onClick={() => setIsOpen(true)}
                className="text-zinc-100 hover:text-brand transition-colors p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-[#0A111F] border-l border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-lg font-bold text-white font-display">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Navigation</p>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                          isActive 
                            ? 'bg-brand/10 text-brand' 
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-zinc-400'}`} />
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-brand' : 'text-zinc-600'}`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Contact Action */}
                <div className="px-4">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full bg-brand hover:bg-brand-dark text-white px-5 py-4 rounded-2xl font-medium transition-colors shadow-lg shadow-brand/20"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>

              {/* Auth Section at Bottom */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                {/* Auth minimized temporarily due to database issues */}
                {/* user ? (...) : (...) */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
