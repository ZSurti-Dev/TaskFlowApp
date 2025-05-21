import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import img1 from '../assets/images/Screen_img.png';
import img2 from '../assets/images/Logo_Group.png';

function SplashScreen() {
  const navigate = useNavigate();
    
  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-center fixed"
      style={{
        background: "linear-gradient(135deg, rgba(197, 255, 236, 0.6) 0%, rgba(255, 248, 214, 0.6) 30%, rgba(243, 233, 255, 0.6) 60%, rgba(255, 233, 235, 0.6) 100%)"
      }}
    >
      {/* Colored dots for visual effect - appear with delay */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
      >
        <div className="absolute h-2 w-2 rounded-full bg-purple-300" style={{ top: '25%', left: '30%' }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-blue-300" style={{ top: '15%', left: '65%' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-green-300" style={{ bottom: '30%', right: '15%' }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-yellow-300" style={{ bottom: '20%', left: '40%' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-pink-300" style={{ bottom: '35%', left: '20%' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-blue-200" style={{ bottom: '25%', left: '30%' }}></div>
      </motion.div>

      {/* TaskFlow Logo Image - comes from bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-4 w-64"
      >
        <img 
          src={img1} 
          alt="TaskFlow Logo" 
          className="w-full h-auto"
        />
      </motion.div>

      {/* Tagline Image - fades in with delay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-64"
      >
        <img 
          src={img2} 
          alt="Prioritize. Plan. Succeed" 
          className="w-full h-auto"
        />
      </motion.div>
    </div>
  );
}

export default SplashScreen;