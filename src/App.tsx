/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TeamMember from './pages/TeamMember';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminUsers from './pages/admin/AdminUsers';
import AdminHomepage from './pages/admin/AdminHomepage';
import AdminAbout from './pages/admin/AdminAbout';
import AdminServices from './pages/admin/AdminServices';
import AdminCareers from './pages/admin/AdminCareers';

export default function App() {
  // Scroll to top on route change
  const ScrollToTop = () => {
    const { pathname } = window.location;
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="careers" element={<Careers />} />
            <Route path="courses" element={<Courses />} />
            <Route path="team/:id" element={<TeamMember />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="homepage" element={<AdminHomepage />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
