"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

const STORAGE_KEY = "tutorial-frontend-progress";

function loadProgress() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded or private browsing
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setCompleted(loadProgress());
  }, []);

  const markCompleted = useCallback((moduleId, lessonId) => {
    setCompleted((prev) => {
      const key = `${moduleId}/${lessonId}`;
      if (prev[key]) return prev;
      const next = { ...prev, [key]: Date.now() };
      saveProgress(next);
      return next;
    });
  }, []);

  const unmarkCompleted = useCallback((moduleId, lessonId) => {
    setCompleted((prev) => {
      const key = `${moduleId}/${lessonId}`;
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (moduleId, lessonId) => !!completed[`${moduleId}/${lessonId}`],
    [completed]
  );

  const getModuleProgress = useCallback(
    (moduleId, lessons) => {
      const done = lessons.filter((l) => completed[`${moduleId}/${l.id}`]).length;
      return { done, total: lessons.length };
    },
    [completed]
  );

  const getTotalProgress = useCallback(
    (modules) => {
      let done = 0;
      let total = 0;
      for (const mod of modules) {
        for (const lesson of mod.lessons) {
          total++;
          if (completed[`${mod.id}/${lesson.id}`]) done++;
        }
      }
      return { done, total };
    },
    [completed]
  );

  const resetProgress = useCallback(() => {
    setCompleted({});
    saveProgress({});
  }, []);

  return (
    <ProgressContext.Provider
      value={{ markCompleted, unmarkCompleted, isCompleted, getModuleProgress, getTotalProgress, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
