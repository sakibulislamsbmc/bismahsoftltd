import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/bismahsoft' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/bismahsoft' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/bismahsoft' },
  { name: 'Linkedin', icon: Linkedin, url: 'https://linkedin.com/company/bismahsoft' },
];

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  { name: 'Social Media Management', path: '/services' },
  { name: 'Content Creation', path: '/services' },
  { name: 'Facebook Ads', path: '/services' },
  { name: 'Digital Strategy', path: '/services' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050B14] border-t border-zinc-800/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-white">
                Bismahsoft Ltd.
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Professional social media management for local businesses in Rajshahi. Creative content, proven strategies, and measurable results.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#0A111F] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-zinc-950 hover:border-brand transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-zinc-100 font-display font-bold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 hover:text-brand transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-zinc-100 font-display font-bold uppercase tracking-wider mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="text-zinc-400 hover:text-brand transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-zinc-100 font-display font-bold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-400 text-sm">Rajshahi, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-400 text-sm">+880 1700 000000</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-400 text-sm">hello@bismahsoft.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Bismahsoft Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
