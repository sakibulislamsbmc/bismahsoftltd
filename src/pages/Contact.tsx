import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState, FormEvent } from 'react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/bismahsoft' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/bismahsoft' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/bismahsoft' },
  { name: 'Linkedin', icon: Linkedin, url: 'https://linkedin.com/company/bismahsoft' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(`Error: ${data.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-[#0A111F]/50 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full"
        >
          <MessageSquare className="w-4 h-4 text-brand" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Get In Touch</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Let's Start a <span className="text-brand">Conversation</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Have a question or ready to grow your business? Reach out to us and our team will get back to you within 24 hours.
        </motion.p>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Column */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-8">
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Our Location</div>
                    <div className="text-zinc-300 font-medium">Rajshahi, Bangladesh</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Call Us</div>
                    <div className="text-zinc-300 font-medium">+880 1700 000000</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Email Us</div>
                    <div className="text-zinc-300 font-medium">hello@bismahsoft.com</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Working Hours</div>
                    <div className="text-zinc-300 font-medium">Sat - Thu: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-display font-bold uppercase tracking-tight">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-[#050B14] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-zinc-950 hover:border-brand transition-all"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12 rounded-[2.5rem]">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050B14] border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050B14] border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#050B14] border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#050B14] border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-brand transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand hover:bg-brand-dark text-zinc-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-4 rounded-[2.5rem] h-[400px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58139.638541944!2d88.5680702!3d24.3746493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a55aa957%3A0x2f1c5d094b7b4272!2sRajshahi!5e0!3m2!1sen!2sbd!4v1711864000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-3xl grayscale invert opacity-50 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </section>
    </div>
  );
}
