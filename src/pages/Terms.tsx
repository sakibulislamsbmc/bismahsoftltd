import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight"
      >
        Terms of <span className="text-brand">Service</span>
      </motion.h1>
      <div className="prose prose-invert max-w-none text-zinc-400 space-y-6">
        <p>Last updated: March 31, 2026</p>
        <p>By accessing or using the Bismahsoft Ltd. website, you agree to be bound by these Terms of Service.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">Use of Services</h2>
        <p>Our services are provided to help local businesses grow their digital presence. You agree to use our services only for lawful purposes.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">Intellectual Property</h2>
        <p>All content on this website, including text, graphics, logos, and images, is the property of Bismahsoft Ltd. and protected by copyright laws.</p>
        <h2 className="text-2xl font-display font-bold text-zinc-100 uppercase tracking-tight">Limitation of Liability</h2>
        <p>Bismahsoft Ltd. shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services.</p>
      </div>
    </div>
  );
}
