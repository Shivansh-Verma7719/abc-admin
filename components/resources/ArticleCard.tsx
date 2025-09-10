import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Clock, User, ExternalLink } from 'lucide-react';
import { ArticleResource } from '@/types/resources';

export default function ArticleCard({ resource, index }: { resource: ArticleResource; index?: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer border border-gray-100"
        >
            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={resource.imageUrl}
                        alt={resource.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />

                    {/* Article Type Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 bg-abc-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                            <FileText className="w-4 h-4" />
                            <span>ARTICLE</span>
                        </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Article Content */}
                <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{resource.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{resource.readTime}</span>
                        </div>
                    </div>

                    {/* Source */}
                    <div className="text-sm text-abc-blue font-medium mb-2">
                        {resource.source}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-abc-blue transition-colors duration-300">
                        {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-abc-blue/10 text-abc-blue px-2 py-1 rounded-full font-medium">
                            {resource.category}
                        </span>
                        <div className="flex items-center gap-1 text-abc-blue font-medium group-hover:gap-2 transition-all duration-300">
                            <span>Read More</span>
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
