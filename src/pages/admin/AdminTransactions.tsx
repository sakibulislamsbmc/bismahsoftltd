import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  userId: string;
  amount: number;
  gateway: string;
  status: string;
  date: string;
  transactionId: string;
  description: string;
  username?: string;
  courseDocId?: string;
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      const allTxns: Transaction[] = [];

      for (const userDoc of usersSnap.docs) {
        const userData = userDoc.data();
        const txnsSnap = await getDocs(collection(db, `users/${userDoc.id}/transactions`));
        
        txnsSnap.forEach(doc => {
          allTxns.push({
            ...doc.data() as Transaction,
            id: doc.id,
            userId: userDoc.id,
            username: userData.username || userData.email,
          });
        });
      }

      // Sort by date descending
      allTxns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTransactions(allTxns);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: string, txnId: string, newStatus: string, courseDocId?: string) => {
    try {
      const txnRef = doc(db, `users/${userId}/transactions`, txnId);
      await updateDoc(txnRef, { status: newStatus });
      
      if (courseDocId) {
        const courseRef = doc(db, `users/${userId}/courses`, courseDocId);
        await updateDoc(courseRef, { status: newStatus === 'Success' ? 'Active' : 'Rejected' });
      }

      fetchTransactions();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  if (loading) return <div className="text-zinc-400">Loading transactions...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Transactions</h1>
        <p className="text-zinc-400 mt-2">Manage user payments and enrollments.</p>
      </div>

      <div className="bg-[#0A111F] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-white/5 text-zinc-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Gateway & ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((txn) => (
                <tr key={`${txn.userId}-${txn.id}`} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{txn.date}</td>
                  <td className="px-6 py-4">{txn.username}</td>
                  <td className="px-6 py-4">{txn.description}</td>
                  <td className="px-6 py-4 font-medium text-white">৳{txn.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white">{txn.gateway}</span>
                      <span className="text-xs font-mono text-zinc-500">{txn.transactionId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'Success' ? 'bg-green-500/10 text-green-400' :
                      txn.status === 'Failed' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {txn.status === 'Success' && <CheckCircle className="w-3.5 h-3.5" />}
                      {txn.status === 'Failed' && <XCircle className="w-3.5 h-3.5" />}
                      {txn.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {txn.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => handleUpdateStatus(txn.userId, txn.id, 'Success', txn.courseDocId)}
                          className="text-green-400 hover:text-green-300 font-medium transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(txn.userId, txn.id, 'Failed', txn.courseDocId)}
                          className="text-red-400 hover:text-red-300 font-medium transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
