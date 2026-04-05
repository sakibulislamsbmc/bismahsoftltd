import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingUp, Users, MessageSquare, Target, Zap, BarChart3, Eye, Layers, PenTool, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContentCollection } from '../hooks/useContentCollection';
import { teamMembers as defaultTeamMembers } from '../data/team';

const iconMap: Record<string, any> = {
  Users, MessageSquare, Target, TrendingUp, Zap, BarChart3, Eye, Layers, PenTool, Rocket
};

const defaultServices = [
  {
    title: 'Social Media Management',
    description: 'We handle your social media presence from A to Z, ensuring consistent engagement and growth.',
    icon: 'Users',
    color: 'text-blue-400',
  },
  {
    title: 'Content Creation',
    description: 'High-quality visuals and compelling copy that resonate with your local audience in Rajshahi.',
    icon: 'MessageSquare',
    color: 'text-purple-400',
  },
  {
    title: 'Facebook Ads',
    description: 'Targeted advertising campaigns that drive real leads and sales for your business.',
    icon: 'Target',
    color: 'text-pink-400',
  },
  {
    title: 'Digital Strategy',
    description: 'Data-driven roadmaps to help your business dominate the local digital landscape.',
    icon: 'TrendingUp',
    color: 'text-brand',
  },
];

const defaultMethodologySteps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'We deep dive into your brand, target audience, and business goals.',
    icon: 'Eye',
  },
  {
    id: '02',
    title: 'Strategy',
    description: 'Crafting a tailored, data-backed marketing blueprint for your growth.',
    icon: 'Layers',
  },
  {
    id: '03',
    title: 'Execution',
    description: 'Rolling out creative campaigns and high-quality converting content.',
    icon: 'PenTool',
  },
  {
    id: '04',
    title: 'Optimization',
    description: 'Monitoring performance actively and scaling what works best.',
    icon: 'TrendingUp',
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: services } = useContentCollection('homepage_services', defaultServices);
  const { data: methodologySteps } = useContentCollection('homepage_methodology', defaultMethodologySteps);
  const { data: teamMembers } = useContentCollection('team_members', defaultTeamMembers);

  useEffect(() => {
    const updateTeamMembers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'team_members'));
        snapshot.forEach(async (document) => {
          const data = document.data();
          if (data.name && data.name.toUpperCase().includes('JOHN DOE')) {
            await updateDoc(doc(db, 'team_members', document.id), {
              name: 'SAKIBUL ISLAM SABBIR',
              image: 'https://image2url.com/r2/default/images/1774957365116-b0f95152-767c-4154-a823-1f8cd92b5b18.jpeg'
            });
          }
          if (data.name && data.name.includes('Jane Smith')) {
            await updateDoc(doc(db, 'team_members', document.id), {
              name: 'NABINA NAWSHAD SHRABONI',
              title: 'Project Manager',
              image: 'https://image2url.com/r2/default/images/1774957874368-cd457cd9-487e-4ce6-93f5-ea60e8ee1a6c.jpeg'
            });
          }
          if (data.name && data.name.includes('Mike Johnson')) {
            await updateDoc(doc(db, 'team_members', document.id), {
              name: 'SHAHIN ALI',
              title: 'Web developer',
              image: 'https://image2url.com/r2/default/images/1774958025378-e03f9f78-81cc-4b2f-8c9e-afb89be6e67e.png'
            });
          }
        });
      } catch (error) {
        console.error("Error updating team members:", error);
      }
    };
    updateTeamMembers();
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Network Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10L90 90M90 10L10 90M50 10L50 90M10 50L90 50' stroke='%233B82F6' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='90' cy='90' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='90' cy='10' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='10' cy='90' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%233B82F6'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-dark/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Digital Excellence Agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[130px] font-anton uppercase leading-[0.85] tracking-normal flex flex-col items-center w-full"
          >
            <span className="text-white">WE DRIVE</span>
            <span className="text-brand italic transform -skew-x-12 pr-2 sm:pr-4">BUSINESS GROWTH</span>
            <span className="text-white">THROUGH <span className="text-brand">MARKETING</span></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Elevate your brand with strategic digital marketing, engaging social media campaigns, and data-driven growth solutions tailored for success.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
        <div className="flex justify-center mb-16">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-[#0A111F]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center divide-y md:divide-y-0 md:divide-x divide-white/10 mb-24">
          {/* Clutch */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 w-full">
            <span className="text-zinc-400 text-sm mb-2">Clutch</span>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">4.8</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          {/* Trustpilot */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 w-full">
            <span className="text-zinc-400 text-sm mb-2">Trustpilot</span>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">4.9</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          {/* GoodFirms */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 w-full">
            <span className="text-zinc-400 text-sm mb-2">GoodFirms</span>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">5.0</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton tracking-wide mb-4">
              <span className="text-white">150</span><span className="text-brand">+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">Projects Delivered</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton tracking-wide mb-4">
              <span className="text-white">99</span><span className="text-brand">%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">Client Satisfaction</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton tracking-wide mb-4">
              <span className="text-white">10</span><span className="text-brand">x</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">Positive Outcomes</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center space-x-4 opacity-60">
          <div className="h-px bg-gradient-to-r from-transparent to-zinc-500 w-16 sm:w-32"></div>
          <span className="text-zinc-400 text-xs sm:text-sm whitespace-nowrap">Trusted by clients from 19+ Countries globally</span>
          <div className="h-px bg-gradient-to-l from-transparent to-zinc-500 w-16 sm:w-32"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">
            Our <span className="text-brand">Expertise</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            We provide a comprehensive suite of digital media services tailored to the unique needs of local businesses in Rajshahi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl group hover:border-brand/50 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-[#050B14] border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-zinc-950 transition-all duration-500`}>
                {(() => {
                  const Icon = iconMap[service.icon] || Zap;
                  return <Icon className="w-7 h-7" />;
                })()}
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Network Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10L90 90M90 10L10 90M50 10L50 90M10 50L90 50' stroke='%233B82F6' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='90' cy='90' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='90' cy='10' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='10' cy='90' r='1.5' fill='%233B82F6'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%233B82F6'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-brand font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">Methodology</h3>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-anton uppercase tracking-wide">
              <span className="text-white">HOW WE </span>
              <span className="text-brand">DELIVER</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column: Steps List */}
            <div className="space-y-4">
              {methodologySteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-start space-x-6 ${
                      isActive 
                        ? 'bg-[#0A111F]/80 border-brand/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                        : 'bg-[#050B14]/50 border-white/5 hover:border-white/10 hover:bg-[#0A111F]/50'
                    }`}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-brand text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-[#111827] text-zinc-500'
                    }`}>
                      {(() => {
                        const Icon = iconMap[step.icon] || Zap;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Step {step.id}: {step.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Step Details */}
            <div className="relative h-full min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-[#0A111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="w-32 h-32 rounded-full bg-brand flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(59,130,246,0.4)] relative">
                    <div className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20" />
                    {(() => {
                      const Icon = iconMap[methodologySteps[activeStep]?.icon] || Zap;
                      return <Icon className="w-12 h-12 text-white relative z-10" />;
                    })()}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">{methodologySteps[activeStep]?.title}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                    {methodologySteps[activeStep]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">
            Meet Our <span className="text-brand">Leadership</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            The experts behind Bismahsoft Ltd. driving digital success for local businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl group hover:border-brand/50 transition-all duration-500 text-center"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A111F] via-transparent to-transparent z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-1 text-white">
                {member.name}
              </h3>
              <p className="text-brand font-medium text-sm uppercase tracking-widest">
                {member.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative rounded-[2rem] overflow-hidden bg-[#050B14]/80 backdrop-blur-xl border border-white/5 p-12 md:p-20 text-center shadow-2xl">
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mb-8">
              <Rocket className="w-8 h-8 text-brand" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-anton uppercase tracking-wide mb-6">
              <span className="text-white">READY TO </span>
              <span className="text-brand">DOMINATE?</span>
            </h2>
            
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              Stop waiting. Start building. Contact us today to turbocharge your digital strategy.
            </p>
            
            <form className="w-full max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#0A111F] border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-[#0A111F] border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-white rounded-full px-6 py-4 font-bold transition-colors mt-4"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
