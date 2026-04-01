import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, BookOpen, CreditCard, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    pendingTransactions: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const coursesSnap = await getDocs(collection(db, 'content_courses'));
        
        let pendingTxns = 0;
        let revenue = 0;

        // Fetch all transactions across all users
        // Note: For a production app, use collectionGroup queries
        for (const userDoc of usersSnap.docs) {
          const txnsSnap = await getDocs(collection(db, `users/${userDoc.id}/transactions`));
          txnsSnap.forEach(doc => {
            const data = doc.data();
            if (data.status === 'Pending') pendingTxns++;
            if (data.status === 'Success') revenue += (data.amount || 0);
          });
        }

        setStats({
          totalUsers: usersSnap.size,
          totalCourses: coursesSnap.size,
          pendingTransactions: pendingTxns,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-zinc-400">Loading dashboard...</div>;
  }

  const statCards = [
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Pending Transactions', value: stats.pendingTransactions, icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { name: 'Total Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Dashboard Overview</h1>
        <p className="text-zinc-400 mt-2">Welcome to the admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#0A111F] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">{stat.name}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
