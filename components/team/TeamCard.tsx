import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import {
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandInstagram,
    IconEdit,
    IconTrash,
    IconMail
} from '@tabler/icons-react';
import { Person } from '@/app/team/helpers';

interface AdminTeamCardProps {
    member: Person;
    index?: number;
    canEdit?: boolean;
    onEdit?: (member: Person) => void;
    onDelete?: (id: number) => void;
}

export default function TeamCard({
    member,
    index = 0,
    canEdit = false,
    onEdit,
    onDelete
}: AdminTeamCardProps) {
    const getSocialIcon = (platform: string) => {
        const iconProps = { size: 18, className: "text-white hover:text-amber-400 transition-colors duration-300" };

        switch (platform.toLowerCase()) {
            case 'linkedin':
                return <IconBrandLinkedin {...iconProps} />;
            case 'twitter':
                return <IconBrandTwitter {...iconProps} />;
            case 'instagram':
                return <IconBrandInstagram {...iconProps} />;
            case 'email':
                return <IconMail {...iconProps} />;
            default:
                return null;
        }
    };

    const getSocialUrl = (platform: string, value: string) => {
        if (platform.toLowerCase() === 'email') {
            return `mailto:${value}`;
        }
        if (platform.toLowerCase() === 'linkedin' && !value.startsWith('http')) {
            return `https://linkedin.com/in/${value}`;
        }
        if (platform.toLowerCase() === 'twitter' && !value.startsWith('http')) {
            return `https://twitter.com/${value}`;
        }
        if (platform.toLowerCase() === 'instagram' && !value.startsWith('http')) {
            return `https://instagram.com/${value}`;
        }
        return value.startsWith('http') ? value : `https://${value}`;
    };

    // Build social links from member data
    const socialLinks = [];
    if (member.linkedin) {
        socialLinks.push({ platform: 'linkedin', url: member.linkedin });
    }
    if (member.twitter) {
        socialLinks.push({ platform: 'twitter', url: member.twitter });
    }
    if (member.instagram) {
        socialLinks.push({ platform: 'instagram', url: member.instagram });
    }
    if (member.email) {
        socialLinks.push({ platform: 'email', url: member.email });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer p-6 relative"
        >
            {/* Edit and Delete buttons for admin */}
            {canEdit && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                    <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={() => onEdit?.(member)}
                    >
                        <IconEdit size={16} />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => onDelete?.(member.id)}
                    >
                        <IconTrash size={16} />
                    </Button>
                </div>
            )}

            {/* Member Image */}
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 md:w-30 md:h-30 relative rounded-full overflow-hidden border-4 border-abc-blue/20">
                    <Image
                        src={member.profile_image || "/images/logo.png"}
                        alt={member.full_name || "Team Member"}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                </div>
            </div>

            {/* Name and Position */}
            <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-abc-blue transition-colors duration-300">
                    {member.full_name}
                </h3>
                <p className="text-gray-600 text-sm">
                    {member.role?.name}
                </p>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
                <div className="flex justify-center gap-2 flex-wrap max-w-[156px] mx-auto">
                    {socialLinks.map((link, linkIndex) => (
                        <Link
                            key={`social-link-${linkIndex}`}
                            href={getSocialUrl(link.platform, link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-abc-blue hover:bg-abc-blue/90 transition-all duration-300 hover:scale-110"
                            aria-label={`${member.full_name} on ${link.platform}`}
                        >
                            {getSocialIcon(link.platform)}
                        </Link>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
