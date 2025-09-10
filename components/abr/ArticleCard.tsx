import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { User, Calendar, ExternalLink } from 'lucide-react';
import { Article } from '@/types/abr';
import { formatDate } from '@/utils/date';


export default function ArticleCard({ article, index }: { article: Article; index?: number }) {
    return (
        <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer"
        >
            <Link href={article.link} className="block">
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-abr-red text-white px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Article Content */}
                <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.publishDate)}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-abr-red transition-colors duration-300">
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <div className="flex items-center gap-1 text-abr-red font-medium group-hover:gap-2 transition-all duration-300">
                            <span>Read More</span>
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
