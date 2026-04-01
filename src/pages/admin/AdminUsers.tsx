import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Shield, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserData {
  uid: string;
  email: string;
  username?: string;
  displayName: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: string;
}

export default function AdminUsers() {
  const { userRole } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      const allUsers: UserData[] = [];
      usersSnap.forEach(doc => {
        allUsers.push(doc.data() as UserData);
      });
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (userRole !== 'superadmin') {
      alert("Only superadmins can change roles.");
      return;
    }

    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  if (loading) return <div className="text-zinc-400">Loading users...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Users & Roles</h1>
        <p className="text-zinc-400 mt-2">Manage user accounts and administrative privileges.</p>
      </div>

      <div className="bg-[#0A111F] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-white/5 text-zinc-300 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Username / Email</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.uid} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{u.displayName || 'N/A'}</td>
                  <td className="px-6 py-4">{u.username || u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.role === 'superadmin' ? 'bg-purple-500/10 text-purple-400' :
                      u.role === 'admin' ? 'bg-brand/10 text-brand' :
                      'bg-white/5 text-zinc-400'
                    }`}>
                      {u.role === 'superadmin' && <ShieldAlert className="w-3.5 h-3.5" />}
                      {u.role === 'admin' && <Shield className="w-3.5 h-3.5" />}
                      {u.role === 'user' && <UserIcon className="w-3.5 h-3.5" />}
                      <span className="capitalize">{u.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {userRole === 'superadmin' && (
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-brand"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
