import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContentCollection } from '../hooks/useContentCollection';

const iconMap: Record<string, any> = {
  Zap, Users, Star, Clock, Briefcase
};

const defaultJobs = [
  {
    title: 'Social Media Manager',
    type: 'Full-time',
    location: 'Rajshahi',
    salary: 'Competitive',
    description: 'We are looking for a creative Social Media Manager to handle our clients presence and drive engagement.',
  },
  {
    title: 'Graphic Designer',
    type: 'Full-time',
    location: 'Rajshahi',
    salary: 'Competitive',
    description: 'Join our creative team to design visually stunning content for local businesses.',
  },
  {
    title: 'Content Writer',
    type: 'Part-time',
    location: 'Remote / Rajshahi',
    salary: 'Competitive',
    description: 'We need a compelling storyteller to create engaging copy for social media and blogs.',
  },
  {
    title: 'Video Editor',
    type: 'Full-time',
    location: 'Rajshahi',
    salary: 'Competitive',
    description: 'Create high-impact video content for our clients social media campaigns.',
  },
];

const defaultBenefits = [
  { title: 'Growth Opportunities', icon: 'Zap' },
  { title: 'Creative Environment', icon: 'Star' },
  { title: 'Flexible Work', icon: 'Clock' },
  { title: 'Collaborative Team', icon: 'Users' },
];

export default function Careers() {
  const { data: jobs } = useContentCollection('careers_jobs', defaultJobs);
  const { data: benefits } = useContentCollection('careers_benefits', defaultBenefits);
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-[#0A111F]/50 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full"
        >
          <Briefcase className="w-4 h-4 text-brand" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Join Our Team</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Build Your <span className="text-brand">Future</span> With Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          We are always looking for talented individuals who are passionate about digital media and helping local businesses succeed.
        </motion.p>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl text-center space-y-4 group hover:border-brand/50 transition-all"
            >
              <div className="w-16 h-16 bg-[#050B14] border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-brand group-hover:text-zinc-950 transition-all">
                {(() => {
                  const Icon = iconMap[benefit.icon] || Zap;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight">{benefit.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Open <span className="text-brand">Positions</span></h2>
          <p className="text-zinc-400">Find the role that fits your skills and passion.</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2rem] group hover:border-brand/50 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-brand transition-colors">
                  {job.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>
              <Link
                to="/contact"
                className="bg-[#0A111F] border border-zinc-800 text-zinc-100 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand hover:text-zinc-950 hover:border-brand transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
