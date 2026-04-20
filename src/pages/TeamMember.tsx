import { useParams, Link } from 'react-router-dom';
import { teamMembers } from '../data/team';
import { ArrowLeft, Linkedin, Twitter, Facebook, Mail, GraduationCap, Briefcase, Award, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeamMember() {
  const { id } = useParams();
  const member = teamMembers.find(m => m.id === id);

  if (!member) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Team Member Not Found</h1>
        <Link to="/about" className="text-brand hover:underline">Return to About Us</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <Link to="/about" className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Team</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex justify-center space-x-4">
            {member.social.linkedin && member.social.linkedin !== '#' && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {member.social.facebook && member.social.facebook !== '#' && (
              <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {member.social.twitter && member.social.twitter !== '#' && (
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {member.social.email && (
              <a href={`mailto:${member.social.email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-7xl font-stylish font-extrabold text-brand uppercase tracking-tighter mb-2">{member.name}</h1>
              <p className="text-xl text-white/60 font-medium tracking-wide">{member.title}</p>
            </div>
            <button
              onClick={() => {
                const url = window.location.href;
                const text = `Check out ${member.name}'s profile at Bismahsoft Ltd.`;
                if (navigator.share) {
                  navigator.share({ title: member.name, text, url });
                } else {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                }
              }}
              className="inline-flex items-center space-x-2 bg-brand/10 hover:bg-brand text-brand hover:text-white px-6 py-3 rounded-full font-bold transition-all border border-brand/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Profile</span>
            </button>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 text-lg leading-relaxed">
              {member.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <Briefcase className="w-5 h-5 text-brand" />
                <h3 className="text-lg font-bold">Areas of Expertise</h3>
              </div>
              <ul className="space-y-2">
                {member.expertise.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-zinc-400">
                    <Award className="w-4 h-4 text-brand/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <GraduationCap className="w-5 h-5 text-brand" />
                <h3 className="text-lg font-bold">Education</h3>
              </div>
              <p className="text-zinc-400">{member.education}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
