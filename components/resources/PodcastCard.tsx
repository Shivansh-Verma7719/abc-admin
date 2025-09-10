import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Clock, User } from 'lucide-react';
import { PodcastResource } from '@/types/resources';
import Image from 'next/image';

export default function PodcastCard({ resource, index }: { resource: PodcastResource; index?: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer text-white"
        >
            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* Spotify-style header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                {/* Spotify Icon */}
                                <Image src="/images/spotify-logo.png" alt="Spotify Icon" width={30} height={30} />
                            </div>
                            <span className="text-sm font-medium">PODCAST</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm opacity-90">
                            <Clock className="w-4 h-4" />
                            <span>{resource.duration}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-green-100 transition-colors duration-300">
                        {resource.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm opacity-90 mb-3">
                        <User className="w-4 h-4" />
                        <span>{resource.host}</span>
                        {resource.episodeNumber && (
                            <>
                                <span>•</span>
                                <span>Episode {resource.episodeNumber}</span>
                            </>
                        )}
                    </div>

                    <p className="text-sm opacity-90 line-clamp-2 mb-4">
                        {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {resource.category}
                        </span>
                        <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                            <Play className="w-5 h-5" />
                            <span className="text-sm font-medium">Listen on Spotify</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
