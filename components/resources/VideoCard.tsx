import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Eye, ExternalLink } from 'lucide-react';
import { VideoResource } from '@/types/resources';
import { IconBrandYoutubeFilled } from '@tabler/icons-react';

export default function VideoCard({ resource, index }: { resource: VideoResource; index?: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer"
        >
            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />

                    {/* YouTube Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                        {resource.duration}
                    </div>

                    {/* YouTube Logo */}
                    <div className="absolute top-3 left-3">
                        <div className="relative">
                            {/* Small white background for the center play icon - behind the logo */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-0"></div>
                            {/* YouTube logo in front */}
                            <IconBrandYoutubeFilled className="w-20 h-15 text-red-600 relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Video Content */}
                <div className="p-6">
                    {/* Channel Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{resource.channelName}</span>
                        {resource.viewCount && (
                            <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{resource.viewCount} views</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                        {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                            {resource.category}
                        </span>
                        <div className="flex items-center gap-1 text-red-600 font-medium group-hover:gap-2 transition-all duration-300">
                            <span>Watch</span>
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
