
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LoadingAnimation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="relative">
            <motion.img 
              src="/lovable-uploads/afdb710c-ae2c-425d-9f31-d6f96fab82eb.png" 
              alt="Revithalize Logo" 
              className="w-64 h-auto"
            />
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-revithalize-green/20 to-transparent"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 200, opacity: 1 }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "linear" 
              }}
            />
          </div>
        </motion.div>
        <motion.div 
          className="h-1 bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full overflow-hidden w-48 mt-4"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="h-full bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 1,
              ease: "linear" 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
