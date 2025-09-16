"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("Carregando");
  const [dots, setDots] = useState("");

  const showLoading = (msg?: string) => {
    setMessage(msg || "Carregando");
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setMessage(undefined);
  };

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}

      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 pointer-events-auto">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          {message && (
            <span className="mt-2 text-black text-lg font-medium animate-pulse">
              {message} {dots}
            </span>
          )}
        </div>
      )}
    </LoadingContext.Provider>
  );
};
