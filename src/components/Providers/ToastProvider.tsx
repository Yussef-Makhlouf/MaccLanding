"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: "#fff",
          color: "#363636",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        // Success
        success: {
          duration: 4000,
          iconTheme: {
            primary: "#15AC9E",
            secondary: "#fff",
          },
          style: {
            background: "#fff",
            color: "#000",
          },
        },
        // Error
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#EF4444",
            secondary: "#fff",
          },
          style: {
            background: "#fff",
            color: "#000",
          },
        },
        // Loading
        loading: {
          iconTheme: {
            primary: "#15AC9E",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}