import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SettingsPanel } from "./SettingsPanel";
import { useTextSize } from "@/contexts/TextSizeContext";
import herbalGardenBg from "@/assets/herbal-garden-bg.jpg";

interface LandingPageProps {
  onEnterGarden: () => void;
}

export const LandingPage = ({ onEnterGarden }: LandingPageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { getTextSizeClass } = useTextSize();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Settings Panel */}
      <SettingsPanel />

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${herbalGardenBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className={`text-6xl md:text-8xl font-bold mb-8 text-primary-foreground text-scalable-4xl`}
          >
            Welcome to Our
            <br />
            <span className="font-extrabold text-6xl md:text-8xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              Virtual Garden
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed text-scalable-xl`}
          >
            Discover the healing power of nature through our interactive
            <br />
            botanical sanctuary of medicinal plants and herbs
          </motion.p>

          {/* Enter Garden Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button
              onClick={onEnterGarden}
              variant="garden"
              size="lg"
              className={`px-16 py-8 text-xl font-bold rounded-full shadow-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-4 border-emerald-300/50 hover:border-emerald-200/70 transition-all duration-300 transform hover:scale-105 text-scalable-lg ${getTextSizeClass()}`}
            >
              <motion.span
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                Enter the Garden
              </motion.span>
            </Button>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-16 h-16 bg-primary-glow/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-20 w-20 h-20 bg-accent/30 rounded-full blur-xl"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};