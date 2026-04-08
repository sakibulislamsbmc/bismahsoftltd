import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, X } from 'lucide-react';
import { googleReviews } from '../data/reviews';

export default function GoogleReviews() {
  const [isOpen, setIsOpen] = useState(false);

  // Google G Logo SVG
  const GoogleLogo = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <>
      {/* Floating Button */}
      <div className="fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-zinc-900 shadow-2xl flex items-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-4 sm:px-5 rounded-full hover:shadow-brand/20 transition-all duration-300 border border-zinc-200 group"
        >
          <GoogleLogo className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Google Reviews</span>
        </motion.button>
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 sm:left-6 bottom-20 sm:bottom-24 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-100 flex items-start justify-between bg-white shrink-0">
              <div className="flex items-start gap-4">
                <GoogleLogo className="w-10 h-10 mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-normal text-zinc-800">4.9</span>
                    <div className="flex text-[#FBBC05]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">55 REVIEWS</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-zinc-100 rounded transition-colors text-zinc-800"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>

            {/* Reviews List */}
            <div className="overflow-y-auto flex-1 p-5 space-y-6 bg-white custom-scrollbar">
              {googleReviews.slice(0, 55).map((review, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  key={review.id} 
                  className="bg-white pb-6 border-b border-zinc-100 last:border-0 relative"
                >
                  <div className="absolute top-0 right-0">
                    <GoogleLogo className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-normal text-xl shrink-0 ${review.color}`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-lg text-zinc-800 pr-8 leading-tight">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex text-[#FBBC05]">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-zinc-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-zinc-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-zinc-800 leading-relaxed">
                    {review.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
