"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { HistoryProvider } from "../../utils/HistoryContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HistoryProvider>
        {children}
      </HistoryProvider>
    </Provider>
  );
}