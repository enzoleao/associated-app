"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface FiltersContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  associateStatusId: string;
  setAssociateStatusId: (value: string) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [associateStatusId, setAssociateStatusId] = useState("0");

  return (
    <FiltersContext.Provider value={{ searchTerm, setSearchTerm, associateStatusId, setAssociateStatusId }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) throw new Error("useFilters must be used within FiltersProvider");
  return context;
};
