import React from 'react'
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container w-full mx-auto h-full py-20"
        >
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left Column - Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="text-sm font-semibold tracking-wider text-abc-blue uppercase">
                                About Us
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            <Link
                                href="/about"
                                className="group hover:text-abc-blue transition-colors duration-500"
                            >
                                Ashoka Business Club
                                <ArrowUpRight className="inline-block w-8 h-8 ml-2 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                        </h2>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            Empowering the next generation of business leaders through innovation,
                            collaboration, and real-world experience.
                        </p>
                    </div>

                    {/* Key Points */}
                    <div className="space-y-4 pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-start gap-4"
                        >
                            <div className="w-2 h-2 bg-abc-blue rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-600 text-lg">
                                Building bridges between business disciplines and fostering interdisciplinary innovation
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-start gap-4"
                        >
                            <div className="w-2 h-2 bg-abc-red rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-600 text-lg">
                                Professional workshops, competitions, and networking events
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex items-start gap-4"
                        >
                            <div className="w-2 h-2 bg-abc-gold rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-600 text-lg">
                                Leveraging Ashoka&apos;s liberal arts foundation for business leadership
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="pt-8"
                    >
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-abc-blue font-semibold text-lg hover:gap-4 transition-all duration-300 group"
                        >
                            Learn More About Us
                            <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Column - Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative flex items-center justify-center group"
                >
                    {/* Simple Logo Container */}
                    <div className="relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl flex items-center justify-center">
                            <Image
                                src="/images/abc-logo.png"
                                alt="Ashoka Business Club Logo"
                                width={180}
                                height={180}
                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                        </div>

                        {/* Simple accent line */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 group-hover:w-full h-1 bg-gradient-to-r from-abc-blue via-abc-gold to-abc-red rounded-full transition-all duration-500"></div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
