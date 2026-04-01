import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Star, Users, CheckCircle2, X, QrCode, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const courses = [
  {
    id: 'graphic-design-ai',
    title: 'Advanced Graphic Design with AI Tools',
    description: 'Master the art of modern graphic design by integrating powerful AI tools into your workflow. Learn to create stunning visuals faster and more efficiently.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    duration: '3 Months',
    students: '1.2k+',
    rating: '4.9',
    price: '৳5,000',
    level: 'Intermediate to Advanced',
    features: [
      'Mastering Adobe Creative Cloud',
      'Midjourney & DALL-E integration',
      'AI-powered photo manipulation',
      'Portfolio building & freelancing tips'
    ],
    color: 'from-blue-500/20 to-transparent',
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    iconColor: 'text-blue-400'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'Dive deep into the world of Generative AI. Understand how LLMs work, prompt engineering, and how to build AI-powered applications from scratch.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    duration: '4 Months',
    students: '850+',
    rating: '4.8',
    price: '৳8,000',
    level: 'Beginner to Advanced',
    features: [
      'Fundamentals of LLMs (ChatGPT, Claude)',
      'Advanced Prompt Engineering',
      'Building custom AI agents',
      'API integration & automation'
    ],
    color: 'from-brand/20 to-transparent',
    borderColor: 'border-brand/50 hover:border-brand',
    iconColor: 'text-brand',
    popular: true
  },
  {
    id: 'basic-video-editing',
    title: 'Basic Video Editing',
    description: 'Start your journey in video production. Learn the basics of cutting, transitions, color grading, and audio mixing to create engaging content.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    duration: '2 Months',
    students: '2.5k+',
    rating: '4.7',
    price: '৳3,500',
    level: 'Beginner',
    features: [
      'Premiere Pro & CapCut basics',
      'Color correction & grading',
      'Audio mixing & sound design',
      'Exporting for social media'
    ],
    color: 'from-purple-500/20 to-transparent',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    iconColor: 'text-purple-400'
  }
];

export default function Courses() {
  const { user, openAuthModal } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pendingCourse, setPendingCourse] = useState<typeof courses[0] | null>(null);

  React.useEffect(() => {
    if (user && pendingCourse) {
      setSelectedCourse(pendingCourse);
      setStep(1);
      setIsModalOpen(true);
      setPendingCourse(null);
    }
  }, [user, pendingCourse]);

  const openModal = async (course: typeof courses[0]) => {
    if (!user) {
      setPendingCourse(course);
      openAuthModal();
      return;
    }
    setSelectedCourse(course);
    setStep(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedCourse(null);
      setStep(1);
      setPaymentMethod('');
      setTransactionId('');
      setIsPreviewOpen(false);
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Proceed to payment method selection
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCourse || !transactionId) return;
    
    setIsSubmitting(true);
    try {
      // Clean price string to number (e.g. '৳5,000' -> 5000)
      const priceValue = parseFloat(selectedCourse.price.replace(/[^0-9.]/g, ''));
      
      // 1. Save Course Enrollment
      const newCourseRef = doc(collection(db, `users/${user.uid}/courses`));
      await setDoc(newCourseRef, {
        id: newCourseRef.id,
        courseId: selectedCourse.id,
        name: selectedCourse.title,
        status: 'Pending Verification',
        progress: 0,
        nextLesson: 'Introduction',
        enrolledAt: new Date().toISOString(),
        userId: user.uid
      });

      // 2. Save Transaction
      const newTxnRef = doc(collection(db, `users/${user.uid}/transactions`));
      await setDoc(newTxnRef, {
        id: newTxnRef.id,
        transactionId: transactionId,
        amount: priceValue,
        gateway: paymentMethod,
        description: `Enrollment: ${selectedCourse.title}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      setStep(4); // Proceed to success screen
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-2 mb-8"
        >
          <BookOpen className="w-4 h-4 text-brand" />
          <span className="text-sm font-medium text-brand uppercase tracking-wider">Dismasoft Academy</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6"
        >
          Master the Skills of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-500">
            Tomorrow
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Join Dismasoft Academy to learn from industry experts. Register easily with your Google account or phone number and start learning today.
        </motion.p>
      </section>

      {/* Courses Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col glass-card rounded-3xl transition-all duration-500 ${course.borderColor} ${course.popular ? 'scale-105 md:-translate-y-4 z-10 bg-[#0A111F]/80 shadow-2xl shadow-brand/10' : 'bg-[#0A111F]/40'}`}
            >
              {course.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-zinc-950 text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full z-20">
                  Most Popular
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-b ${course.color} opacity-20 rounded-3xl pointer-events-none`} />
              
              {/* Course Image */}
              <div className="h-48 w-full relative rounded-t-3xl overflow-hidden border-b border-white/5">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A111F] to-transparent opacity-80" />
              </div>

              <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 ${course.iconColor}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold tracking-tight mb-3 text-white">
                  {course.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-8 text-sm text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-4 h-4 ${course.iconColor}`} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className={`w-4 h-4 ${course.iconColor}`} />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${course.iconColor}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-8 border-t border-zinc-800/50 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Course Fee</div>
                    <div className="text-3xl font-display font-bold text-white">{course.price}</div>
                  </div>
                  <button
                    onClick={() => openModal(course)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      course.popular 
                        ? 'bg-brand text-zinc-950 hover:bg-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Enroll <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A111F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 shrink-0">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Enrollment Process</h2>
                  <p className="text-sm text-zinc-400">{selectedCourse.title}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {/* Step 1: Enrollment Form */}
                {step === 1 && (
                  <motion.form 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Full Name</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Mobile Number</label>
                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="+880 1XXX XXXXXX" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email Address</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="john@example.com" />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Address Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">Division</label>
                          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="Dhaka" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">District</label>
                          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="Dhaka" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">Upazila / Municipality</label>
                          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="Mirpur" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">Union Council / Ward No.</label>
                          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="Ward 14" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <label className="text-sm font-medium text-zinc-300">National ID (NID) Number</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" placeholder="1234567890" />
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-zinc-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                        Proceed to Payment <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 2: Payment Method Selection */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">Select Payment Method</h3>
                      <p className="text-zinc-400">Choose how you want to pay the course fee of <strong className="text-white">{selectedCourse.price}</strong></p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button 
                        onClick={() => { setPaymentMethod('bKash'); setStep(3); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#E2136E] transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#E2136E] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-white font-bold text-sm">bKash</span>
                        </div>
                        <span className="font-medium text-white">bKash</span>
                      </button>
                      
                      <button 
                        onClick={() => { setPaymentMethod('Nagad'); setStep(3); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ED1C24] transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#ED1C24] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-white font-bold text-sm">Nagad</span>
                        </div>
                        <span className="font-medium text-white">Nagad</span>
                      </button>

                      <button 
                        onClick={() => { setPaymentMethod('Rocket'); setStep(3); }}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#8C1515] transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#8C1515] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-white font-bold text-sm">Rocket</span>
                        </div>
                        <span className="font-medium text-white">Rocket</span>
                      </button>
                    </div>
                    
                    <button onClick={() => setStep(1)} className="w-full mt-4 py-3 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                      &larr; Back to Form
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Payment Details & QR */}
                {step === 3 && (
                  <motion.form 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handlePaymentSubmit}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">Pay via {paymentMethod}</h3>
                      <p className="text-zinc-400">Scan the QR code or send money to the number below.</p>
                    </div>

                    {paymentMethod === 'bKash' ? (
                      <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <div className="relative w-full max-w-md mb-6 group">
                          <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-500/30 transition-colors pointer-events-none" />
                          <img 
                            src="https://image2url.com/r2/default/images/1774943530490-20950f10-3ba7-4085-8287-a4b95bd7a54c.png" 
                            alt="bKash Payment Card" 
                            onClick={() => setIsPreviewOpen(true)}
                            className="relative w-full h-auto rounded-2xl shadow-2xl object-contain border border-white/10 cursor-zoom-in hover:scale-[1.02] transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-brand font-medium text-lg">Amount to Pay: {selectedCourse.price}</p>
                          <p className="text-sm text-zinc-400 mt-2">Please scan the QR code or send money to the number on the card.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <div className="bg-white p-4 rounded-2xl mb-6">
                          {/* Placeholder QR Code */}
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DismasoftAcademy_${paymentMethod}_Payment`} 
                            alt={`${paymentMethod} QR Code`}
                            className="w-40 h-40"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-zinc-400 mb-1">Official {paymentMethod} Number</p>
                          <p className="text-2xl font-bold text-white tracking-wider">+880 1712 345678</p>
                          <p className="text-brand font-medium mt-2">Amount: {selectedCourse.price}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Enter Transaction ID</label>
                        <input 
                          required 
                          type="text" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all font-mono uppercase tracking-wider text-center" 
                          placeholder="e.g. 8A7B6C5D4E" 
                        />
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50" disabled={isSubmitting}>
                          Back
                        </button>
                        <button type="submit" disabled={isSubmitting} className="w-2/3 bg-brand hover:bg-brand-dark text-zinc-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                          {isSubmitting ? 'Verifying...' : 'Verify Payment'} <ShieldCheck className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white">Request Pending</h3>
                    <p className="text-zinc-400 max-w-md leading-relaxed">
                      Thank you for enrolling in <strong>{selectedCourse.title}</strong>. Your payment request is currently pending until approved by an admin.
                    </p>
                    <div className="p-4 bg-brand/10 border border-brand/20 rounded-xl text-brand text-sm max-w-md">
                      Once approved, you will be notified via email and SMS, and you will be able to access the course content.
                    </div>
                    <button 
                      onClick={closeModal}
                      className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
                    >
                      Return to Courses
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full flex items-center justify-center pointer-events-none"
            >
              <img 
                src="https://image2url.com/r2/default/images/1774943530490-20950f10-3ba7-4085-8287-a4b95bd7a54c.png" 
                alt="bKash Payment Card Preview" 
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment & Registration Info */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-blue-500/10 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Seamless Registration & Payment</h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create your account instantly using your <strong>Phone number</strong>. Once registered, you can easily purchase any course using popular Bangladeshi payment gateways.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E2136E] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">bKash</span>
                </div>
                <span className="font-medium text-zinc-300">bKash</span>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ED1C24] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Nagad</span>
                </div>
                <span className="font-medium text-zinc-300">Nagad</span>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8C1515] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Rocket</span>
                </div>
                <span className="font-medium text-zinc-300">Rocket</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
