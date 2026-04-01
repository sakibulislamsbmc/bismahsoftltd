import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X, Download } from 'lucide-react';
import { fallbackCourses } from '../Courses';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: string;
  rating: string;
  price: string;
  level: string;
  features: string[];
  color: string;
  borderColor: string;
  iconColor: string;
  popular?: boolean;
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '', description: '', image: '', duration: '', students: '', rating: '', price: '', level: '', features: [], popular: false,
    color: 'from-blue-500/20 to-transparent', borderColor: 'border-blue-500/30 hover:border-blue-500/60', iconColor: 'text-blue-400'
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'content_courses'));
      const data: Course[] = [];
      snap.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as Course);
      });
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseId = editingCourse?.id || formData.title?.toLowerCase().replace(/\s+/g, '-') || Date.now().toString();
      const courseRef = doc(db, 'content_courses', courseId);
      
      await setDoc(courseRef, {
        ...formData,
        id: courseId
      });
      
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, 'content_courses', id));
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({
        title: '', description: '', image: '', duration: '', students: '', rating: '', price: '', level: '', features: [], popular: false,
        color: 'from-blue-500/20 to-transparent', borderColor: 'border-blue-500/30 hover:border-blue-500/60', iconColor: 'text-blue-400'
      });
    }
    setIsModalOpen(true);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
  };

  const seedDefaultCourses = async () => {
    if (!window.confirm('Are you sure you want to seed the default courses?')) return;
    try {
      for (const course of fallbackCourses) {
        const courseId = course.title.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(db, 'content_courses', courseId), {
          ...course,
          id: courseId
        });
      }
      fetchCourses();
    } catch (error) {
      console.error("Error seeding courses:", error);
      alert("Failed to seed courses.");
    }
  };

  if (loading) return <div className="text-zinc-400">Loading courses...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Manage Courses</h1>
          <p className="text-zinc-400 mt-2">Add, edit, or remove courses from the platform.</p>
        </div>
        <div className="flex gap-4">
          {courses.length === 0 && (
            <button 
              onClick={seedDefaultCourses}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" /> Seed Defaults
            </button>
          )}
          <button 
            onClick={() => openModal()}
            className="bg-brand hover:bg-brand-dark text-zinc-950 font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#0A111F] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
            <img src={course.image} alt={course.title} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openModal(course)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-brand font-medium mt-1">{course.price}</p>
              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{course.description}</p>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-[#0A111F] border border-white/10 rounded-2xl">
            No courses found. Click "Add Course" to create one.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#0A111F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="courseForm" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Price</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" placeholder="e.g. ৳5,000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" rows={3} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Image URL</label>
                  <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Duration</label>
                    <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Level</label>
                    <input required value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Rating</label>
                    <input required value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Features</label>
                  <div className="flex gap-2">
                    <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand outline-none" placeholder="Add a feature..." />
                    <button type="button" onClick={addFeature} className="bg-white/10 px-4 rounded-xl text-white hover:bg-white/20">Add</button>
                  </div>
                  <ul className="space-y-2 mt-2">
                    {formData.features?.map((f, i) => (
                      <li key={i} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg text-sm text-zinc-300">
                        {f} <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="popular" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} className="w-4 h-4 accent-brand" />
                  <label htmlFor="popular" className="text-sm text-zinc-300">Mark as Popular</label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-zinc-400 hover:text-white font-medium">Cancel</button>
              <button form="courseForm" type="submit" className="bg-brand hover:bg-brand-dark text-zinc-950 font-bold px-6 py-2 rounded-xl transition-colors">Save Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
