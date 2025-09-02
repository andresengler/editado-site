import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ManifestoPage } from './components/ManifestoPage';
import { FloatingLetters } from './components/FloatingLetters';

import { useIsMobile } from './components/ui/use-mobile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const isMobile = useIsMobile();
  
  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setNextPage(page);
    
    // Refined timing for ultra-smooth aesthetic transitions
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextPage('');
      }, 180); // Optimized for elegant appearance
    }, 120); // Faster, more subtle exit phase
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onPageChange={handleNavigate} />;
      case 'manifesto':
        return <ManifestoPage onPageChange={handleNavigate} />;
      default:
        return <HomePage />;
    }
  };

  // Use unified background for all pages
  const getBackgroundClass = () => {
    return 'bg-background';
  };

  const getBackgroundOverlayClass = () => {
    return 'bg-background';
  };

  // Determine layout class based on page - maintain specific overflow behavior while using unified transitions
  const getLayoutClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      // Special layout for About and Manifesto - no overflow restrictions for sticky positioning
      return 'relative z-1 lg:px-[6vw]';
    }
    // Standard layout for Home page - perfect centering with flex
    return 'flex flex-col min-h-screen relative z-1 lg:px-[6vw]';
  };

  const getContainerClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      return `${getBackgroundClass()} bg-smooth-transition cinematic-transition ${isTransitioning ? 'active' : ''} font-sans relative`;
    }
    return `min-h-screen ${getBackgroundClass()} bg-smooth-transition cinematic-transition ${isTransitioning ? 'active' : ''} flex flex-col font-sans overflow-x-hidden relative`;
  };

  return (
    <div className={getContainerClass()}>
      {/* UNIFIED TRANSITION SYSTEM - Same for all pages */}
      
      {/* Ultra-subtle transition overlay with refined depth */}
      <motion.div
        className={`bg-transition-overlay ${getBackgroundOverlayClass()}`}
        animate={{
          opacity: isTransitioning ? 0.08 : 0,
          scale: isTransitioning ? 1.001 : 1
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ zIndex: isTransitioning ? 1 : -1 }}
      />

      {/* Refined blur overlay with aesthetic effects */}
      <motion.div
        className="page-blur-overlay"
        animate={{
          backdropFilter: isTransitioning 
            ? 'blur(3px) saturate(1.04) brightness(0.995) contrast(1.01)' 
            : 'blur(0px) saturate(1) brightness(1) contrast(1)',
          opacity: isTransitioning ? 0.98 : 1
        }}
        transition={{
          duration: 0.28,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ zIndex: isTransitioning ? 30 : -1 }}
      />

      {/* Ultra-subtle texture overlay for editorial sophistication */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          opacity: isTransitioning ? 0.015 : 0
        }}
        transition={{
          duration: 0.32,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ 
          zIndex: isTransitioning ? 25 : -1,
          background: `
            radial-gradient(circle at 33% 33%, rgba(0,0,0,0.008) 0.5px, transparent 0.5px),
            radial-gradient(circle at 67% 67%, rgba(0,0,0,0.006) 0.5px, transparent 0.5px),
            radial-gradient(circle at 50% 85%, rgba(0,0,0,0.007) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '12px 12px, 16px 16px, 14px 14px'
        }}
      />

      {/* Global floating letters effect - unified */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-100">
        <FloatingLetters />
      </div>
      
      {/* Main content container - adaptive layout with enhanced motion */}
      <motion.div 
        className={getLayoutClass()}
        animate={{
          opacity: isTransitioning ? 0.85 : 1,
          filter: isTransitioning ? 'blur(0.5px) saturate(0.98)' : 'blur(0px) saturate(1)',
          y: isTransitioning ? -1 : 0,
          scale: isTransitioning ? 0.9995 : 1
        }}
        transition={{
          duration: 0.28,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Header - consistent for all pages */}
        <div className="relative z-20">
          <Header currentPage={currentPage} onPageChange={handleNavigate} />
        </div>
        
        {/* Page content container - adaptive based on page type */}
        <div className={currentPage === 'home' ? 'flex-1 relative z-1' : 'relative z-1'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ 
                opacity: 0, 
                y: 8, 
                filter: 'blur(1px) saturate(0.96)',
                scale: 1.005 
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px) saturate(1)',
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: -4, 
                filter: 'blur(0.8px) saturate(0.98)',
                scale: 0.998 
              }}
              transition={{
                duration: 0.38,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.32 },
                y: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
                filter: { duration: 0.3 },
                scale: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer - consistent for all pages */}
        <div className="relative z-50">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}