import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandInstagram,
    IconBrandGithub,
    IconMail,
    IconWorld
} from '@tabler/icons-react';
import { TeamMember, SocialLink } from '@/types/team';

interface TeamCardProps {
    member: TeamMember;
    index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
    const getSocialIcon = (platform: SocialLink['platform']) => {
        const iconProps = { size: 18, className: "text-white hover:text-abc-gold transition-colors duration-300" };

        switch (platform) {
            case 'linkedin':
                return <IconBrandLinkedin {...iconProps} />;
            case 'twitter':
                return <IconBrandTwitter {...iconProps} />;
            case 'instagram':
                return <IconBrandInstagram {...iconProps} />;
            case 'github':
                return <IconBrandGithub {...iconProps} />;
            case 'email':
                return <IconMail {...iconProps} />;
            case 'website':
                return <IconWorld {...iconProps} />;
            default:
                return null;
        }
    };

    const getSocialUrl = (link: SocialLink) => {
        if (link.platform === 'email') {
            return `mailto:${link.url}`;
        }
        return link.url;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer p-6"
        >
            {/* Member Image */}
            <div className="flex justify-center mb-2">
                <div className="w-20 h-20 md:w-30 md:h-30 relative rounded-full overflow-hidden border-4 border-abc-blue/20">
                    <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                </div>
            </div>

            {/* Name and Position */}
            <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-abc-blue transition-colors duration-300">
                    {member.name}
                </h3>
                <p className="text-gray-600 text-sm">
                    {member.position}
                </p>
            </div>

            {/* Social Links */}
            {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="flex justify-center gap-2 flex-wrap max-w-[156px] mx-auto">
                    {member.socialLinks.map((link, linkIndex) => (
                        <Link
                            key={`social-link-${linkIndex}`}
                            href={getSocialUrl(link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-abc-blue hover:bg-abc-blue/90 transition-all duration-300 hover:scale-110"
                            aria-label={`${member.name} on ${link.platform}`}
                        >
                            {getSocialIcon(link.platform)}
                        </Link>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
