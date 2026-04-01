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
  const { user, signInWithGoogle, logout } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign in', error);
    }
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
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
                      alt={user.displayName || 'User'} 
                      className="w-9 h-9 rounded-full border-2 border-brand/50 hover:border-brand transition-colors object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-48 bg-[#0A111F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 pointer-events-auto"
                      >
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                          <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-2 border-b border-white/5"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="text-zinc-300 hover:text-white text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

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
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
                        alt={user.displayName || 'User'} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand/30"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                        <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                          navigate('/');
                        }}
                        className="flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full bg-white/5 hover:bg-white/10 text-white px-5 py-4 rounded-2xl font-medium transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In with Google</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
