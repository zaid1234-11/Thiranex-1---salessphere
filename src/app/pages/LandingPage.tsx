import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const INITIAL_TABS = [
  {
    id: 'analytics',
    label: 'Analytics',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    badge: 'Over 1,200 enterprises finding clarity in their data',
    heading: 'Intelligence in an Endlessly Noisy Universe',
    subtext: 'Rise above the chaos of fragmented data, endless spreadsheets, and relentless reporting. Discover how to protect your margins and scale with intention.',
    stats: ['Loading...', 'Loading...', '4.9 Enterprise Satisfaction', 'Intentional-First Design']
  },
  {
    id: 'forecasting',
    label: 'Forecasting',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    badge: 'Predictive Models powered by AI',
    heading: 'See the Future Before It Happens',
    subtext: 'Our proprietary machine learning models analyze millions of data points to forecast revenue, predict churn, and identify growth opportunities before they become obvious.',
    stats: ['99.2% Forecast Accuracy', 'Automated Anomaly Detection', 'Real-time Adjustments', 'Scenario Planning']
  },
  {
    id: 'integrations',
    label: 'Integrations',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    badge: 'Connects with your entire stack',
    heading: 'Your Data, Unified Finally',
    subtext: 'Seamlessly sync with Salesforce, Hubspot, Stripe, and 50+ other platforms. Stop jumping between tools and start seeing the complete picture in one unified view.',
    stats: ['50+ Native Integrations', 'Real-time Syncing', 'Zero-Code Setup', 'Custom API Available']
  },
  {
    id: 'security',
    label: 'Security',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    badge: 'Bank-grade encryption & SOC2 Type II',
    heading: 'Enterprise Security Without Compromise',
    subtext: 'Your data is your most valuable asset. We protect it with military-grade encryption, role-based access control, and continuous security audits.',
    stats: ['SOC2 Type II Certified', 'End-to-End Encryption', 'Role-Based Access Control', '24/7 Threat Monitoring']
  }
];

export function LandingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const navigate = useNavigate();

  // Fetch real dataset KPI to update the hero stats
  useEffect(() => {
    fetch('/dataset/processed/summary/dashboard/kpiSummary.json')
      .then(res => res.json())
      .then(data => {
        setTabs(prevTabs => {
          const newTabs = [...prevTabs];
          // Update the first tab (analytics) with real revenue (multiplied by 83 for INR conversion) and orders
          newTabs[0].stats[0] = `₹${((data.revenue * 83) / 1000000).toFixed(1)}M+ Revenue Tracked`;
          newTabs[0].stats[1] = `${(data.orders / 1000).toFixed(1)}K+ Transactions`;
          return newTabs;
        });
      })
      .catch(console.error);
  }, []);

  // Dark mode logic when 3rd tab (integrations/Deep Woods) is active
  const isDarkMode = activeTab === 2;
  const currentTab = tabs[activeTab];

  const handleTabSwitch = (index: number) => {
    if (isTransitioning || index === activeTab) return;
    
    setIsTransitioning(true);
    setActiveTab(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // 1000ms cooldown matches css transition
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black font-['Instrument_Serif'] text-white selection:bg-white/20">
      
      {/* 1. Background Video Layer */}
      {tabs.map((tab, index) => (
        <video
          key={tab.videoUrl}
          src={tab.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
            activeTab === index ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        />
      ))}

      {/* 2. Transparent PNG Overlay (z-index 1) with Train-bob */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none bg-cover bg-center animate-train-bob"
        style={{ backgroundImage: 'url(https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png)' }}
      />

      {/* 3. Content Layer (z-index 2) */}
      <div className="relative z-[2] flex flex-col h-full w-full max-w-[1440px] mx-auto px-6 py-6 md:px-12 md:py-8">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <div className="text-white italic text-xl sm:text-2xl cursor-pointer">
            SalesSphere
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
            <div className="flex items-center gap-6 px-6 font-sans text-sm text-white/90">
              {tabs.map((tab, index) => (
                <button 
                  key={tab.id}
                  onClick={() => handleTabSwitch(index)}
                  className={`transition-colors font-medium tracking-wide ${
                    activeTab === index ? 'text-white drop-shadow-md' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-black font-sans text-sm font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Login to Dashboard
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden liquid-glass w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu 
              className={`absolute text-white transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`} 
              size={24} 
            />
            <X 
              className={`absolute text-white transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
              }`} 
              size={24} 
            />
          </button>
        </nav>

        {/* Hero Content (Centered) */}
        <div 
          className={`flex-1 flex flex-col items-center justify-center text-center mt-12 md:mt-0 transition-colors duration-700 ${
            isDarkMode ? 'text-[#182C41]' : 'text-white'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Badge */}
              <div className="liquid-glass rounded-full px-4 py-1.5 mb-8">
                <span className={`font-sans text-xs tracking-wide uppercase font-medium ${isDarkMode ? 'text-[#182C41]/80' : 'text-white/80'}`}>
                  {currentTab.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-4xl w-full tracking-tight px-4">
                {currentTab.heading.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== currentTab.heading.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              {/* Subtext */}
              <p className={`mt-6 w-full max-w-[480px] px-4 text-base sm:text-lg font-sans font-light leading-relaxed ${isDarkMode ? 'text-[#182C41]/80' : 'text-white/80'}`}>
                {currentTab.subtext}
              </p>

              {/* Action Button Area */}
              <div className="mt-10 liquid-glass rounded-full p-1.5 flex items-center justify-between w-full max-w-[280px]">
                <span className={`flex-1 font-sans text-sm font-medium px-4 ${isDarkMode ? 'text-[#182C41]/80' : 'text-white/80'}`}>
                  Ready to scale?
                </span>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-black font-sans text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap hover:scale-105 transition-transform duration-300"
                >
                  Enter Platform
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stats */}
        <div className="w-full flex justify-center md:justify-between items-center pb-2 h-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-xs sm:text-sm text-white/70"
            >
              <span>{currentTab.stats[0]}</span>
              <span className="hidden md:inline">|</span>
              <span>{currentTab.stats[1]}</span>
              <span className="hidden md:inline">|</span>
              <span>{currentTab.stats[2]}</span>
              <span className="hidden md:inline">|</span>
              <span>{currentTab.stats[3]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 4. Mobile Menu Overlay (z-50) */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col justify-center items-center ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {tabs.map((tab, i) => (
            <button 
              key={tab.id}
              className={`text-white text-3xl font-sans transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + i * 50}ms` }}
              onClick={() => {
                handleTabSwitch(i);
                setIsMobileMenuOpen(false);
              }}
            >
              {tab.label}
            </button>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/dashboard');
            }}
            className={`mt-4 bg-white text-black font-sans text-lg font-medium px-8 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Login to Dashboard
          </button>
        </div>
      </div>
      
    </section>
  );
}
