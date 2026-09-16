"use client";

import { ProgressProvider } from "@/hooks/useProgress";

export default function Providers({ children }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
