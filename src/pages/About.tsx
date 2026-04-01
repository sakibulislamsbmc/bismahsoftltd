import { motion } from 'motion/react';
import { Target, Users, Zap, Heart, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamMembers as defaultTeamMembers } from '../data/team';
import { useContentCollection } from '../hooks/useContentCollection';

const iconMap: Record<string, any> = {
  Target, Users, Zap, Heart, Shield, Award
};

const defaultValues = [
  { title: 'Innovation', description: 'We stay ahead of digital trends to keep your business relevant.', icon: 'Zap' },
  { title: 'Integrity', description: 'Transparent strategies and honest reporting are our foundation.', icon: 'Shield' },
  { title: 'Passion', description: 'We love what we do, and it shows in the results we deliver.', icon: 'Heart' },
  { title: 'Excellence', description: 'We strive for perfection in every post, ad, and strategy.', icon: 'Award' },
];

export default function About() {
  const { data: values } = useContentCollection('about_values', defaultValues);
  const { data: teamMembers } = useContentCollection('team_members', defaultTeamMembers);
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight">
            About <span className="text-brand">Bismahsoft Ltd.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Founded in Rajshahi, Bismahsoft Ltd. was born out of a passion for helping local businesses thrive in the digital age. We saw a gap in professional, high-quality digital management for local enterprises and decided to fill it.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Our mission is to empower local businesses with creative content and data-driven strategies that drive real growth and engagement.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">Our <span className="text-brand">Core Values</span></h2>
          <p className="text-zinc-400">The principles that guide our work and relationships with our clients.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 group/values">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl text-center space-y-4 transition-all duration-500 bg-white/5 hover:bg-white/10 group-hover/values:blur-sm hover:!blur-none group-hover/values:opacity-40 hover:!opacity-100"
            >
              <div className="w-16 h-16 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-white transition-all">
                {(() => {
                  const Icon = iconMap[value.icon] || Zap;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight">{value.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#0A111F]/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Our <span className="text-brand">Team</span></h2>
            <p className="text-zinc-400">Meet the creative minds behind Bismahsoft Ltd.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <Link to={`/team/${member.id}`} className="block h-full">
                  <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl text-center hover:bg-[#1e293b] transition-colors h-full flex flex-col items-center group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-transparent group-hover:border-brand/50 transition-all"
                      referrerPolicy="no-referrer"
                    />
                    <h3 className="text-lg font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-brand text-sm font-medium mb-3">
                      {member.title}
                    </p>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
