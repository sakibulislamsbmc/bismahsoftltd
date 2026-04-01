import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'image';
}

interface AdminListEditorProps {
  title: string;
  collectionName: string;
  fields: Field[];
}

export default function AdminListEditor({ title, collectionName, fields }: AdminListEditorProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchItems();
  }, [collectionName]);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      const initialData: any = {};
      fields.forEach(f => initialData[f.name] = '');
      setFormData(initialData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), formData);
      } else {
        await addDoc(collection(db, collectionName), formData);
      }
      fetchItems();
      handleCloseModal();
    } catch (error) {
      console.error(`Error saving ${collectionName}:`, error);
      alert('Failed to save item.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchItems();
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
      alert('Failed to delete item.');
    }
  };

  if (loading) {
    return <div className="animate-pulse h-32 bg-white/5 rounded-2xl"></div>;
  }

  return (
    <div className="bg-[#0A111F] border border-white/10 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-xl transition-colors text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 text-sm">
              {fields.map(f => (
                <th key={f.name} className="py-3 px-4 font-medium">{f.label}</th>
              ))}
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {fields.map(f => (
                  <td key={f.name} className="py-3 px-4 text-zinc-300">
                    {f.type === 'image' ? (
                      <img src={item[f.name]} alt="" className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <span className="line-clamp-1">{item[f.name]}</span>
                    )}
                  </td>
                ))}
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={fields.length + 1} className="py-8 text-center text-zinc-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A111F] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button onClick={handleCloseModal} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="itemForm" onSubmit={handleSubmit} className="space-y-4">
                {fields.map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        required
                        value={formData[f.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 transition-colors"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={f.type === 'number' ? 'number' : 'text'}
                        required
                        value={formData[f.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-xl font-bold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="itemForm"
                className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-xl font-bold transition-colors"
              >
                {editingId ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
