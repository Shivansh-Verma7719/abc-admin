import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import {
    IconEdit,
    IconTrash,
    IconArrowUp,
    IconArrowDown
} from '@tabler/icons-react';
import { Person } from '@/app/team/helpers';
import AdminTeamCard from './team/TeamCard';

interface DynamicTeamSectionProps {
    title: string;
    members: Person[];
    canEdit?: boolean;
    teamId?: number;
    onEdit?: (member: Person) => void;
    onDelete?: (id: number) => void;
    onEditTeam?: (teamId: number) => void;
    onDeleteTeam?: (teamId: number) => void;
    onMoveTeamUp?: (teamId: number) => void;
    onMoveTeamDown?: (teamId: number) => void;
}

export default function DynamicTeamSection({
    title,
    members,
    canEdit = false,
    teamId,
    onEdit,
    onDelete,
    onEditTeam,
    onDeleteTeam,
    onMoveTeamUp,
    onMoveTeamDown
}: DynamicTeamSectionProps) {
    // Get gradient color based on team name
    const getTeamColor = (teamName: string) => {
        const colors = [
            "from-blue-500 to-purple-500",
            "from-green-500 to-teal-500",
            "from-purple-500 to-pink-500",
            "from-orange-500 to-red-500",
            "from-yellow-500 to-orange-500",
            "from-gray-700 to-gray-900",
            "from-indigo-500 to-blue-500"
        ];

        // Simple hash function to get consistent color for each team
        let hash = 0;
        for (let i = 0; i < teamName.length; i++) {
            hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            {/* Team Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className={`inline-block bg-gradient-to-r ${getTeamColor(title)} text-white px-6 py-3 rounded-full mb-4 relative`}>
                        <h2 className="text-2xl font-bold">
                            {title}
                        </h2>
                        {canEdit && teamId && (
                            <div className="absolute -right-2 -top-2 flex gap-1">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="default"
                                    variant="flat"
                                    className="bg-white/20 backdrop-blur-sm"
                                    onPress={() => onMoveTeamUp?.(teamId)}
                                >
                                    <IconArrowUp size={16} className="text-white" />
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="default"
                                    variant="flat"
                                    className="bg-white/20 backdrop-blur-sm"
                                    onPress={() => onMoveTeamDown?.(teamId)}
                                >
                                    <IconArrowDown size={16} className="text-white" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600 text-lg">
                            {members.length} member{members.length !== 1 ? 's' : ''}
                        </p>
                        {canEdit && teamId && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    startContent={<IconEdit size={16} />}
                                    onPress={() => onEditTeam?.(teamId)}
                                >
                                    Edit Team
                                </Button>
                                <Button
                                    size="sm"
                                    color="danger"
                                    variant="flat"
                                    startContent={<IconTrash size={16} />}
                                    onPress={() => onDeleteTeam?.(teamId)}
                                >
                                    Delete Team
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, index) => (
                    <AdminTeamCard
                        key={member.id}
                        member={member}
                        index={index}
                        canEdit={canEdit}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Empty State */}
            {members.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No members in this team yet</p>
                </div>
            )}
        </motion.section>
    );
}
