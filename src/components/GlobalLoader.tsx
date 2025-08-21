import React, { useEffect, useState } from "react";
import { loadingBus } from "../utils/loadingBus";

// Full-page blur overlay with a circular spinner
const GlobalLoader: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Subscribe to global loading changes
    const unsubscribe = loadingBus.subscribe((count) => {
      setActive(count > 0);
      // Prevent body scroll when active
      if (count > 0) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    return unsubscribe;
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Circular loader */}
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    </div>
  );
};

export default GlobalLoader;
