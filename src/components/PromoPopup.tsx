import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ArrowRight, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1 second
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when popup is open
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

  const phoneNumber = '8801345417317';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Animation variants for staggered text entrance
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Popup Content - Strict Rectangular Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0A111F] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] overflow-y-auto md:overflow-y-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white/70 hover:text-white rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section - No padding, w-full, h-auto to ensure no empty space on sides and no cropping */}
              <div className="w-full md:w-1/2 bg-[#050A15] flex items-center justify-center relative overflow-hidden">
                <motion.img
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  src="https://image2url.com/r2/default/images/1775038301334-04ae9488-50b3-4e53-9744-2a077a962334.png"
                  alt="Second batch admissions"
                  className="w-full h-auto object-contain block"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-gradient-to-br from-[#0A111F] to-[#111827] overflow-y-auto">
                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col"
                >
                  <motion.div variants={textItemVariants} className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-6 w-fit">
                    <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" />
                    <span className="text-xs font-bold text-brand uppercase tracking-widest">Admissions Open</span>
                  </motion.div>

                  <motion.h2 variants={textItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-display leading-[1.15] mb-6 tracking-tight">
                    Second batch admissions are ongoing.
                  </motion.h2>

                  <motion.p variants={textItemVariants} className="text-lg text-zinc-300 mb-8 leading-relaxed font-light">
                    Join our comprehensive courses and accelerate your career in the digital world. Limited seats available for the upcoming batch.
                  </motion.p>

                  <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                      className="group relative flex-1 bg-brand hover:bg-[#1ebd5c] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-0.5"
                    >
                      <span className="relative z-10 text-lg">Apply Now</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                      className="group flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Info className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      <span className="text-lg">More Details</span>
                    </Link>
                  </motion.div>

                  {/* Contact Section */}
                  <motion.div variants={textItemVariants} className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1 font-medium uppercase tracking-wider">Have questions?</p>
                      <p className="text-xl text-white font-bold tracking-wide">+880 1345-417317</p>
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-[#25D366]/10 hover:bg-[#25D366] border border-[#25D366]/30 text-[#25D366] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/30 group"
                    >
                      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
