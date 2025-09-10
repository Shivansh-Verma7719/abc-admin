import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Users, ExternalLink, Calendar } from 'lucide-react';
import { NewsletterResource } from '@/types/resources';

export default function NewsletterCard({ resource, index }: { resource: NewsletterResource; index?: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer text-white"
        >
            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* Newsletter Header */}
                <div className="relative p-6">
                    {/* Newsletter Image/Logo */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/20">
                            <Image
                                src={resource.imageUrl}
                                alt={resource.publisherName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-5 h-5" />
                                <span className="text-sm font-medium opacity-90">NEWSLETTER</span>
                            </div>

                            <h3 className="text-xl font-bold mb-1 group-hover:text-blue-100 transition-colors duration-300">
                                {resource.title}
                            </h3>

                            <p className="text-sm opacity-90">
                                by {resource.publisherName}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm opacity-90 line-clamp-3 mb-4">
                        {resource.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm opacity-90 mb-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{resource.frequency}</span>
                        </div>
                        {resource.subscriberCount && (
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{resource.subscriberCount} subscribers</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {resource.category}
                        </span>
                        <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                            <span className="text-sm font-medium">Subscribe</span>
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
