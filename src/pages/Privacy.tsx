import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight"
      >
        Privacy <span className="text-brand">Policy</span>
      </motion.h1>
      <div className="prose prose-invert max-w-none text-zinc-400 space-y-6">
        <p>Last updated: March 31, 2026</p>
        <p>At Bismahsoft Ltd., we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your projects.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">Data Security</h2>
        <p>We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.</p>
      </div>
    </div>
  );
}
