import React, { useState } from "react";
import { motion } from "framer-motion";

interface JusticeLeagueTitleProps {
  initialMode?: string;
  size?: "sm" | "md" | "lg";
  showControls?: boolean;
  className?: string;
}

export const JusticeLeagueTitle: React.FC<JusticeLeagueTitleProps> = ({
  initialMode = "SIGMA",
  size = "md",
  showControls = false,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentText] = useState(initialMode);

  // Size styling maps
  const sizeStyles = {
    sm: "max-h-[60px] sm:max-h-[75px] max-w-[240px] sm:max-w-[300px]",
    md: "max-h-[80px] sm:max-h-[105px] max-w-[310px] sm:max-w-[390px]",
    lg: "max-h-[125px] sm:max-h-[160px] max-w-[440px] sm:max-w-[520px]",
  };

  return (
    <div
      className={`relative inline-flex flex-col items-start justify-center select-none ${className}`}
      aria-label="SIGMA Title"
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex items-center group"
      >
        {!imgError ? (
          <img
            src="/assets/sigma_justice_league.png"
            alt={currentText}
            onError={() => setImgError(true)}
            className={`w-auto h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,240,255,0.35)] filter contrast-125 brightness-110 hover:brightness-125 transition-all duration-300 ${sizeStyles[size]}`}
          />
        ) : (
          /* High-Fidelity 3D Metallic Fallback */
          <div className="relative flex items-center py-1">
            <span
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text drop-shadow-[0_10px_25px_rgba(0,240,255,0.4)]"
              style={{
                fontFamily: "'Bebas Neue', 'Antonio', sans-serif",
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #d4e7f5 30%, #7dbcdb 55%, #185a9d 78%, #0f2b48 100%)",
                WebkitTextStroke: "1px rgba(0, 240, 255, 0.4)",
                letterSpacing: "0.1em",
              }}
            >
              {currentText}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
