import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, BookOpen, CreditCard, LogOut, Home, FileText, Info, Briefcase, Settings } from 'lucide-react';

export default function AdminLayout() {
  const { user, userRole, logout } = useAuth();
  const location = useLocation();

  if (!user || (userRole !== 'admin' && userRole !== 'superadmin')) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Homepage', path: '/admin/homepage', icon: Home },
    { name: 'About Page', path: '/admin/about', icon: Info },
    { name: 'Services Page', path: '/admin/services', icon: Settings },
    { name: 'Careers Page', path: '/admin/careers', icon: Briefcase },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Transactions', path: '/admin/transactions', icon: CreditCard },
  ];

  if (userRole === 'superadmin') {
    navItems.push({ name: 'Users & Roles', path: '/admin/users', icon: Users });
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A111F] border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-display font-bold text-white">Admin Panel</h2>
          <p className="text-xs text-zinc-400 mt-1 capitalize">{userRole}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-brand/10 text-brand' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-950">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
