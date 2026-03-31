import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Download, FileText, BookOpen, CreditCard, CheckCircle2, Clock, Plus, X } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { collection, query, onSnapshot, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Service {
  id: string;
  name: string;
  status: string;
  date: string;
}

interface Course {
  id: string;
  name: string;
  progress: number;
  nextLesson: string;
}

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  gateway: string;
  status: string;
  description: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const [services, setServices] = useState<Service[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyForm, setVerifyForm] = useState({
    transactionId: '',
    amount: '',
    gateway: 'bKash',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const servicesRef = collection(db, `users/${user.uid}/services`);
    const coursesRef = collection(db, `users/${user.uid}/courses`);
    const transactionsRef = collection(db, `users/${user.uid}/transactions`);

    const unsubServices = onSnapshot(servicesRef, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
    });

    const unsubCourses = onSnapshot(coursesRef, (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    });

    const unsubTransactions = onSnapshot(transactionsRef, (snapshot) => {
      setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction)));
    });

    return () => {
      unsubServices();
      unsubCourses();
      unsubTransactions();
    };
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  const downloadPDF = async () => {
    if (!dashboardRef.current) return;
    try {
      // Temporarily hide elements that shouldn't be in the PDF
      const elementsToHide = dashboardRef.current.querySelectorAll('.no-print');
      elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

      const dataUrl = await toJpeg(dashboardRef.current, { 
        quality: 1.0, 
        backgroundColor: '#0A111F',
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: dashboardRef.current.offsetWidth + 'px',
          height: dashboardRef.current.offsetHeight + 'px'
        },
        filter: (node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;
            const style = window.getComputedStyle(element);
            // Replace oklab colors with fallback hex colors
            if (style.color && style.color.includes('oklab')) {
              element.style.color = '#ffffff';
            }
            if (style.backgroundColor && style.backgroundColor.includes('oklab')) {
              element.style.backgroundColor = '#0A111F';
            }
            if (style.borderColor && style.borderColor.includes('oklab')) {
              element.style.borderColor = '#374151';
            }
          }
          return true;
        }
      });
      
      // Restore hidden elements
      elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dashboard_Statement_${user.displayName?.replace(/\s+/g, '_') || 'User'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadJPEG = async () => {
    if (!dashboardRef.current) return;
    try {
      const elementsToHide = dashboardRef.current.querySelectorAll('.no-print');
      elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

      const dataUrl = await toJpeg(dashboardRef.current, { 
        quality: 1.0, 
        backgroundColor: '#0A111F',
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: dashboardRef.current.offsetWidth + 'px',
          height: dashboardRef.current.offsetHeight + 'px'
        },
        filter: (node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;
            const style = window.getComputedStyle(element);
            // Replace oklab colors with fallback hex colors
            if (style.color && style.color.includes('oklab')) {
              element.style.color = '#ffffff';
            }
            if (style.backgroundColor && style.backgroundColor.includes('oklab')) {
              element.style.backgroundColor = '#0A111F';
            }
            if (style.borderColor && style.borderColor.includes('oklab')) {
              element.style.borderColor = '#374151';
            }
          }
          return true;
        }
      });
      
      elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

      const link = document.createElement('a');
      link.download = `Dashboard_Statement_${user.displayName?.replace(/\s+/g, '_') || 'User'}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating JPEG:', error);
    }
  };

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const newTxnRef = doc(collection(db, `users/${user.uid}/transactions`));
      await setDoc(newTxnRef, {
        id: newTxnRef.id,
        transactionId: verifyForm.transactionId,
        amount: parseFloat(verifyForm.amount),
        gateway: verifyForm.gateway,
        description: verifyForm.description || 'Payment Verification',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        userId: user.uid
      });
      
      setIsVerifyModalOpen(false);
      setVerifyForm({ transactionId: '', amount: '', gateway: 'bKash', description: '' });
    } catch (error) {
      console.error('Error submitting payment verification:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-display">Welcome back, {user.displayName}</h1>
          <p className="text-zinc-400 mt-1">Here is your account summary and recent activity.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsVerifyModalOpen(true)}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Verify Payment</span>
          </button>
          <button
            onClick={downloadJPEG}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Save as JPEG</span>
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-brand/20"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Dashboard Content to be exported */}
      <div 
        ref={dashboardRef} 
        className="bg-[#0A111F] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl space-y-10"
      >
        {/* User Info Header (Visible mainly for the export) */}
        <div className="flex items-center space-x-4 border-b border-white/5 pb-6">
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
            alt={user.displayName || 'User'} 
            className="w-16 h-16 rounded-full border-2 border-brand/50 object-cover"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
            <p className="text-zinc-400">{user.email}</p>
            <p className="text-xs text-zinc-500 mt-1">Statement generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Purchased Services */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-semibold">Purchased Services</h3>
            </div>
            <div className="space-y-3">
              {services.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">No services purchased yet.</p>
              ) : (
                services.map(service => (
                  <div key={service.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-sm text-zinc-400">Date: {service.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Active' ? 'bg-green-500/10 text-green-400' : 
                      service.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' : 
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <BookOpen className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            </div>
            <div className="space-y-3">
              {courses.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">No courses enrolled yet.</p>
              ) : (
                courses.map(course => (
                  <div key={course.id} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-white">{course.name}</p>
                      <span className="text-sm text-brand font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                      <div className="bg-brand h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-zinc-400">
                      <Clock className="w-3 h-3" />
                      <span>Next: {course.nextLesson}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Payment Transactions */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-semibold">Payment Transactions</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-sm text-zinc-400">
                  <th className="pb-3 font-medium">Transaction ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Gateway</th>
                  <th className="pb-3 font-medium">Amount (BDT)</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500 italic">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn, idx) => (
                    <tr key={txn.id} className={idx !== transactions.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="py-4 text-zinc-300 font-mono text-xs">{txn.transactionId || txn.id}</td>
                      <td className="py-4 text-zinc-300">{txn.date}</td>
                      <td className="py-4 text-white">{txn.description}</td>
                      <td className="py-4 text-zinc-300">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs">
                          {txn.gateway}
                        </span>
                      </td>
                      <td className="py-4 text-white font-medium">৳ {txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          txn.status === 'Success' ? 'text-green-400 bg-green-500/10' :
                          txn.status === 'Pending' ? 'text-yellow-400 bg-yellow-500/10' :
                          'text-red-400 bg-red-500/10'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verify Payment Modal */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A111F] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white">Verify Payment</h3>
              <button 
                onClick={() => setIsVerifyModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleVerifyPayment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Payment Gateway</label>
                <select 
                  required
                  value={verifyForm.gateway}
                  onChange={e => setVerifyForm({...verifyForm, gateway: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Transaction ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 9A7B6C5D4E"
                  value={verifyForm.transactionId}
                  onChange={e => setVerifyForm({...verifyForm, transactionId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Amount (BDT)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">৳</span>
                  <input 
                    type="number" 
                    required
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    value={verifyForm.amount}
                    onChange={e => setVerifyForm({...verifyForm, amount: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description / Course Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Web Development Course"
                  value={verifyForm.description}
                  onChange={e => setVerifyForm({...verifyForm, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
