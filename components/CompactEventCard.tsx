'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react'
import { IconClock, IconMapPin, IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import type { Event } from '@/types/events'

interface CompactEventCardProps {
    event: Event
    onRegister: () => void
}

export default function CompactEventCard({ event, onRegister }: CompactEventCardProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            year: date.getFullYear()
        }
    }

    const dateInfo = formatDate(event.date)

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
        >
            <Card
                className="h-full w-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group"
            >
                {/* Header with Date Badge and Category */}
                <CardHeader className="p-0 relative">
                    <div className="relative w-full h-48 overflow-hidden">
                        <Image
                            src={event.image}
                            alt={event.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-md">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-abc-blue leading-none">{dateInfo.day}</div>
                                <div className="text-xs font-medium text-gray-600 uppercase">{dateInfo.month}</div>
                                <div className="text-xs text-gray-500">{dateInfo.year}</div>
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                            <Chip
                                variant="solid"
                                color="primary"
                                size="sm"
                                className="bg-abc-blue/90 text-white font-medium"
                            >
                                {event.category}
                            </Chip>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </CardHeader>

                <CardBody className="p-6 flex-1 flex flex-col">
                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-abc-blue transition-colors duration-200">
                        {event.name}
                    </h3>

                    {/* One-liner */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {event.one_liner}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <IconClock className="w-4 h-4 text-abc-blue flex-shrink-0" />
                            <span className="truncate">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <IconMapPin className="w-4 h-4 text-abc-blue flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    </div>

                    {/* Register Button */}
                    <Button
                        color="primary"
                        variant="solid"
                        className="w-full bg-abc-blue hover:bg-abc-gold text-white font-semibold"
                        endContent={<IconExternalLink className="w-4 h-4" />}
                        onPress={onRegister}
                    >
                        Register Now
                    </Button>
                </CardBody>
            </Card>
        </motion.div>
    )
}
