"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Language } from "@/i18n/navigation";
import { siteCopy } from "@/i18n/site-copy";

const STORAGE_KEY = "gharjagga-language";
const listeners = new Set<() => void>();
let memoryLanguage: Language = "ne";

function getServerLanguage(): Language {
  return "ne";
}

function getStoredLanguage(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    memoryLanguage = storedLanguage === "en" ? "en" : "ne";
    return memoryLanguage;
  } catch {
    return memoryLanguage;
  }
}

function subscribeToLanguage(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    getServerLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language === "ne" ? "ne-NP" : "en-NP";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage(nextLanguage) {
        memoryLanguage = nextLanguage;
        try {
          window.localStorage.setItem(STORAGE_KEY, nextLanguage);
        } catch {
          // The in-memory value keeps the switcher functional without storage.
        }
        listeners.forEach((listener) => listener());
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useSiteCopy() {
  const { language } = useLanguage();
  return siteCopy[language];
}
