'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Maintenance = ({ locale }: { locale: string }) => {
    const isAr = locale === 'ar';

    const content = {
        en: {
            title: 'Under Maintenance',
            message: 'Our website is currently undergoing scheduled maintenance. We will be back shortly. Thank you for your patience.',
            contact: 'Reach out to us at:',
            email: 'info@macc-fm.com'
        },
        ar: {
            title: 'الموقع تحت الصيانة',
            message: 'موقعنا حالياً قيد الصيانة المجدولة. سنعود قريباً. شكراً لصبركم وتفهمكم.',
            contact: 'يمكنكم التواصل معنا عبر:',
            email: 'info@macc-fm.com'
        }
    };

    const t = isAr ? content.ar : content.en;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-2xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Logo Section */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                        className="mb-12"
                    >
                        <div className="relative w-[200px] h-[100px]">
                            <Image
                                src="/images/logo.svg"
                                alt="MACC Logo"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Maintenance Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 tracking-tight">
                            {t.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
                            {t.message}
                        </p>
                    </motion.div>

                    {/* Progress Bar / Pulse */}
                    <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden mb-12 relative mx-auto">
                        <motion.div
                            className="absolute inset-0 bg-primary"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-sm font-medium text-gray-500 uppercase tracking-widest space-y-2"
                    >
                        <p>{t.contact}</p>
                        <a
                            href={`mailto:${t.email}`}
                            className="text-primary hover:text-primary-dark transition-colors duration-300 block text-lg lowercase"
                        >
                            {t.email}
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

export default Maintenance;
