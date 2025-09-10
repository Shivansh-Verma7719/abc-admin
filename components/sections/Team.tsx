import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '@/types/team';
import TeamCard from '@/components/team/TeamCard';

interface TeamSectionProps {
    teamMembers: TeamMember[];
    showCount?: number;
}

export default function TeamSection({ teamMembers, showCount = 4 }: TeamSectionProps) {
    // Show first few members based on showCount
    const displayMembers = teamMembers.slice(0, showCount);

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
                            href="/team"
                            className="group flex flex-row items-center gap-2"
                        >
                            <Users className="w-10 h-10 text-abc-blue" />
                            <h2 className="text-4xl">Meet Our Team</h2>
                            <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-all duration-300 text-abc-blue" />
                        </Link>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Get to know the passionate individuals behind Ashoka Business Club. Our diverse team brings together
                        expertise in business, technology, marketing, and more to create exceptional experiences.
                    </p>
                </div>

                {/* Team Icon/Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-shrink-0 hidden md:block"
                >
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-abc-blue to-abc-gold rounded-full flex items-center justify-center shadow-2xl">
                        <Users className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                    </div>
                </motion.div>
            </div>

            {/* Team Members Grid */}
            <div className="mb-10">
                {/* Desktop Grid (4 columns) */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                    {displayMembers.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>

                {/* Tablet Grid (3 columns) */}
                <div className="hidden md:grid lg:hidden md:grid-cols-3 gap-6">
                    {displayMembers.slice(0, 3).map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>

                {/* Mobile Grid (2 columns) */}
                <div className="grid md:hidden grid-cols-2 gap-4">
                    {displayMembers.slice(0, 2).map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg"
                >
                    <div className="text-2xl font-bold text-abc-blue mb-1">
                        {teamMembers.length}+
                    </div>
                    <div className="text-sm text-gray-600">Team Members</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg"
                >
                    <div className="text-2xl font-bold text-abc-gold mb-1">
                        {Array.from(new Set(teamMembers.map(m => m.department).filter(Boolean))).length}
                    </div>
                    <div className="text-sm text-gray-600">Departments</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg"
                >
                    <div className="text-2xl font-bold text-abc-blue mb-1">
                        50+
                    </div>
                    <div className="text-sm text-gray-600">Events Hosted</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg"
                >
                    <div className="text-2xl font-bold text-abc-gold mb-1">
                        {new Date().getFullYear() - 2022}+
                    </div>
                    <div className="text-sm text-gray-600">Years Active</div>
                </motion.div>
            </div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-5"
            >
                <Link
                    href="/team"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-abc-blue to-abc-gold text-white px-4 md:px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                    <Users className="w-5 h-5" />
                    <span>Meet the Full Team</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </motion.div>
        </motion.div>
    );
}
