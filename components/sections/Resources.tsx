import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Resource } from '@/types/resources';
import PodcastCard from '@/components/resources/PodcastCard';
import VideoCard from '@/components/resources/VideoCard';
import NewsletterCard from '@/components/resources/NewsletterCard';
import ArticleCard from '@/components/resources/ArticleCard';

export default function LearningResourcesSection({ resources }: { resources: Resource[] }) {
    // Group resources by type for better layout
    const podcastResources = resources.filter(r => r.type === 'podcast');
    const videoResources = resources.filter(r => r.type === 'video');

    const renderResourceCard = (resource: Resource, index: number) => {
        switch (resource.type) {
            case 'podcast':
                return <PodcastCard key={resource.id} resource={resource} index={index} />;
            case 'video':
                return <VideoCard key={resource.id} resource={resource} index={index} />;
            case 'newsletter':
                return <NewsletterCard key={resource.id} resource={resource} index={index} />;
            case 'article':
                return <ArticleCard key={resource.id} resource={resource} index={index} />;
            default:
                return null;
        }
    };

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
                            href="/resources"
                            className="group flex flex-row items-center gap-2"
                        >
                            <GraduationCap className="w-10 h-10 text-abc-blue" />
                            <h2 className="text-4xl">Learning & Development</h2>
                            <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-all duration-300 text-abc-blue" />
                        </Link>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Expand your business acumen with our curated collection of learning resources. From industry-leading podcasts
                        and insightful videos to expert newsletters and thought-provoking articles, discover the tools to accelerate your professional growth.
                    </p>
                </div>

                {/* Learning Icon/Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-shrink-0 hidden md:block"
                >
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-abc-blue to-abc-gold rounded-full flex items-center justify-center shadow-2xl">
                        <GraduationCap className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                    </div>
                </motion.div>
            </div>

            {/* Featured Resource Masonry Grid */}
            <div className="mb-10">
                {/* Desktop Masonry Grid (3 columns) */}
                <div className="hidden lg:block">
                    <div className="columns-3 gap-8 space-y-8">
                        {resources.slice(0, 6).map((resource, index) => (
                            <div key={resource.id} className="break-inside-avoid mb-8">
                                {renderResourceCard(resource, index)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablet Masonry Grid (2 columns) */}
                <div className="hidden md:block lg:hidden">
                    <div className="columns-2 gap-6 space-y-6">
                        {resources.slice(0, 6).map((resource, index) => (
                            <div key={resource.id} className="break-inside-avoid mb-6">
                                {renderResourceCard(resource, index)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Single Column */}
                <div className="block md:hidden space-y-6">
                    {resources.slice(0, 6).map((resource, index) => renderResourceCard(resource, index))}
                </div>
            </div>

            {/* Resource Type Sections (if you want to show more organized) */}
            {resources.length > 6 && (
                <div className="space-y-10 mb-10">
                    {/* Podcasts Section */}
                    {podcastResources.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                                Featured Podcasts
                            </h3>
                            {/* Desktop 2-column masonry */}
                            <div className="hidden md:block">
                                <div className="columns-2 gap-6 space-y-6">
                                    {podcastResources.slice(0, 2).map((resource, index) => (
                                        <div key={resource.id} className="break-inside-avoid mb-6">
                                            {renderResourceCard(resource, index)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Mobile single column */}
                            <div className="block md:hidden space-y-6">
                                {podcastResources.slice(0, 2).map((resource, index) => renderResourceCard(resource, index))}
                            </div>
                        </div>
                    )}

                    {/* Videos Section */}
                    {videoResources.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                                Recommended Videos
                            </h3>
                            {/* Desktop 2-column masonry */}
                            <div className="hidden md:block">
                                <div className="columns-2 gap-6 space-y-6">
                                    {videoResources.slice(0, 2).map((resource, index) => (
                                        <div key={resource.id} className="break-inside-avoid mb-6">
                                            {renderResourceCard(resource, index)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Mobile single column */}
                            <div className="block md:hidden space-y-6">
                                {videoResources.slice(0, 2).map((resource, index) => renderResourceCard(resource, index))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* View More Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-5"
            >
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-abc-blue to-abc-gold text-white px-4 md:px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                    <GraduationCap className="w-5 h-5" />
                    <span>Explore All Resources</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </motion.div>
        </motion.div>
    );
}
