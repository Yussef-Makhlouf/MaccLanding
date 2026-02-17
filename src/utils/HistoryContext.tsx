"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useContext, useState, startTransition } from "react";

interface HistoryContextType {
  previousRoute: string | null;
}

const HistoryContext = createContext<HistoryContextType>({
  previousRoute: null,
});

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([pathname]);

  useEffect(() => {
    startTransition(() => {
      setHistory((prevHistory) => {
        if (prevHistory[prevHistory.length - 1] !== pathname) {
          return [...prevHistory, pathname];
        }
        return prevHistory;
      });
    });
  }, [pathname]);

  const previousRoute = history.length > 1 ? history[history.length - 2] : null;

  return (
    <HistoryContext.Provider value={{ previousRoute }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);