import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '@/types/abr';
import ArticleCard from '@/components/abr/ArticleCard';
import Image from 'next/image';

export default function ABRSection({ articles }: { articles: Article[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container w-full mx-auto h-full"
        >
            {/* Header */}
            <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                    <h2 className="text-4xl flex flex-row items-center gap-4 md:text-5xl font-bold mb-6 text-foreground">
                        <Link
                            href="/abr"
                            className="group flex flex-row items-center gap-2"
                        >
                            <h2 className="text-4xl text-abr-red">Ashoka Business Review</h2>
                            <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-all duration-300 text-abr-red" />
                        </Link>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Dive deep into the world of business with insights, analysis, and thought leadership from Ashoka&apos;s brightest minds.
                        Our review features cutting-edge research, industry trends, and expert perspectives on the future of business.
                    </p>
                </div>

                {/* ABR Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-shrink-0"
                >
                    <div className="relative ml-auto w-32 h-32 lg:w-40 lg:h-40">
                        <Image
                            src="/images/abr-logo.png"
                            alt="Ashoka Business Review Logo"
                            fill
                            className="object-contain filter drop-shadow-2xl"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                ))}
            </div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
            >
                <Link
                    href="/abr"
                    className="inline-flex items-center gap-3 bg-abr-red text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                    <span>View All Articles</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </motion.div>
        </motion.div>
    );
}