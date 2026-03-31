import { motion } from 'motion/react';
import { Users, MessageSquare, Target, TrendingUp, BarChart3, Globe, Camera, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Social Media Management',
    description: 'We handle your social media presence from A to Z, ensuring consistent engagement and growth across all platforms.',
    icon: Users,
    features: ['Daily Posting', 'Engagement Management', 'Community Building', 'Growth Tracking'],
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    title: 'Content Creation',
    description: 'High-quality visuals and compelling copy that resonate with your local audience in Rajshahi.',
    icon: MessageSquare,
    features: ['Graphic Design', 'Photography', 'Video Editing', 'Copywriting'],
    color: 'bg-purple-500/10 text-purple-400',
  },
  {
    title: 'Facebook Ads',
    description: 'Targeted advertising campaigns that drive real leads and sales for your business with high ROI.',
    icon: Target,
    features: ['Audience Targeting', 'Ad Creative Design', 'A/B Testing', 'Performance Analysis'],
    color: 'bg-pink-500/10 text-pink-400',
  },
  {
    title: 'Digital Strategy',
    description: 'Data-driven roadmaps to help your business dominate the local digital landscape and stay ahead.',
    icon: TrendingUp,
    features: ['Market Research', 'Competitor Analysis', 'Campaign Planning', 'ROI Optimization'],
    color: 'bg-brand/10 text-brand',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your visibility on search engines and attract organic traffic to your business.',
    icon: Globe,
    features: ['Keyword Research', 'On-page SEO', 'Local SEO', 'Link Building'],
    color: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    title: 'Brand Identity',
    description: 'Create a memorable and professional brand image that stands out in the market.',
    icon: PenTool,
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Voice'],
    color: 'bg-orange-500/10 text-orange-400',
  },
];

export default function Services() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-[#0A111F]/50 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full"
        >
          <BarChart3 className="w-4 h-4 text-brand" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Our Expertise</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Comprehensive <span className="text-brand">Digital Solutions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          We offer a wide range of services designed to help local businesses in Rajshahi grow their online presence and reach more customers.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] group hover:border-brand/50 transition-all duration-500 flex flex-col"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="w-full text-center py-4 rounded-2xl bg-[#0A111F] border border-zinc-800 text-sm font-bold uppercase tracking-widest hover:bg-brand hover:text-zinc-950 hover:border-brand transition-all"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#0A111F]/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Our <span className="text-brand">Process</span></h2>
            <p className="text-zinc-400">How we work to deliver exceptional results for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We learn about your business, goals, and audience.' },
              { step: '02', title: 'Strategy', desc: 'We create a custom roadmap for your growth.' },
              { step: '03', title: 'Execution', desc: 'Our team brings the strategy to life with creative content.' },
              { step: '04', title: 'Optimization', desc: 'We track results and refine our approach for maximum ROI.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative space-y-4 glass-card p-8 rounded-3xl group hover:border-brand/50 hover:bg-white/5 transition-all duration-500"
              >
                <div className="text-6xl font-display font-bold text-zinc-800 group-hover:text-brand/30 transition-colors">{item.step}</div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-brand group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-px bg-zinc-800 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-[#0A111F]/50 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Pricing Plans</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight"
          >
            Social Media Management <span className="text-brand">Made Simple</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg leading-relaxed"
          >
            We offer tailored, result-driven social media packages for businesses looking to grow and connect with their audience online.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '৳15,000',
              period: '/month',
              desc: 'The Starter package is perfect for businesses looking to establish their online presence. It includes setting up your Facebook and Instagram pages, creating 12 branded posts per month with captions, managing basic inbox replies, and providing a monthly performance summary. It’s the ideal starting point to get your brand noticed on social media.',
              color: 'from-blue-500/20 to-transparent',
              borderColor: 'border-blue-500/30 hover:border-blue-500/60',
              textColor: 'text-blue-400'
            },
            {
              name: 'Growth',
              price: '৳30,000',
              period: '/month',
              desc: 'The Growth package is designed for businesses ready to expand their reach and engage their audience consistently. It includes 20 posts per month, a mix of images and reels, with strategic branding for design. We handle community replies and offer a monthly strategy meeting along with an engagement performance report. This package is best for businesses looking to grow with clarity and consistency.',
              color: 'from-yellow-400/20 to-transparent',
              borderColor: 'border-yellow-400/50 hover:border-yellow-400',
              textColor: 'text-yellow-400',
              popular: true
            },
            {
              name: 'Premium',
              price: '৳45,000',
              period: '/month',
              desc: 'Premium is for brands that want results through advanced strategies. In addition to everything in the Growth package, Premium includes full Facebook and Instagram ad management, campaign setup and tracking, detailed performance reporting, and advanced analytics. We also offer WhatsApp support for real-time ideas and updates. Perfect for ambitious brands looking to scale faster.',
              color: 'from-amber-400/20 to-transparent',
              borderColor: 'border-amber-400/30 hover:border-amber-400/60',
              textColor: 'text-amber-400'
            }
          ].map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col text-center glass-card p-8 rounded-3xl transition-all duration-500 ${pkg.borderColor} ${pkg.popular ? 'scale-105 md:-translate-y-4 z-10 bg-[#0A111F]/80 shadow-2xl shadow-yellow-400/10' : 'bg-[#0A111F]/40'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-zinc-950 text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-b ${pkg.color} opacity-20 rounded-3xl pointer-events-none`} />
              
              <div className="relative z-10 flex-grow">
                <h3 className={`text-2xl font-display font-bold uppercase tracking-tight mb-2 ${pkg.textColor}`}>
                  {pkg.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-display font-bold text-white">{pkg.price}</span>
                  <span className="text-zinc-400 text-sm font-medium">{pkg.period}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {pkg.desc}
                </p>
              </div>
              
              <div className="relative z-10 mt-auto pt-8 border-t border-zinc-800/50">
                <Link
                  to="/contact"
                  className={`block w-full text-center py-4 rounded-2xl border text-sm font-bold uppercase tracking-widest transition-all ${
                    pkg.popular 
                      ? 'bg-yellow-400 text-zinc-950 border-yellow-400 hover:bg-white hover:border-white' 
                      : 'bg-[#0A111F] text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
