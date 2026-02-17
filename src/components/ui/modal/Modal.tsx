"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  isRTL?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "600px",
  isRTL = false,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
              />
            </Dialog.Overlay>

            {/* Content */}
            <Dialog.Content forceMount asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl w-[95%] md:w-full max-h-[90vh] overflow-hidden"
                style={{ maxWidth }}
                dir={isRTL ? "rtl" : "ltr"}
              >
                {/* Title - Always present for accessibility */}
                {title ? (
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <Dialog.Title
                      className="font-bold"
                      style={{
                        ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "20px",
                      }}
                    >
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                      >
                        <FiX className="text-2xl" />
                      </button>
                    </Dialog.Close>
                  </div>
                ) : (
                  <>
                    {/* Hidden title for accessibility */}
                    <VisuallyHidden.Root>
                      <Dialog.Title>Dialog</Dialog.Title>
                    </VisuallyHidden.Root>

                    {/* Close button */}
                    <Dialog.Close asChild>
                      <button
                        className={`absolute top-4 ${
                          isRTL ? "left-4" : "right-4"
                        } w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors z-10 shadow-md`}
                        aria-label="Close"
                      >
                        <FiX className="text-2xl" />
                      </button>
                    </Dialog.Close>
                  </>
                )}

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  {children}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;