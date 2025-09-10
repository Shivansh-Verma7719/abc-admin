import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/dist/client/link'
import { ArrowUpRight } from 'lucide-react'
import { Carousel } from '../ui/card-carousel'
import EventActivityCalendar from '../ui/activity-calendar'
import { Event } from '@/types/events'

export default function EventSection({ events }: { events: Event[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container w-full mx-auto h-full"
        >
            <h2 className="max-w-7xl flex flex-row items-center gap-4 px-4 text-4xl md:text-5xl font-bold text-foreground">
                <Link
                    href="/events"
                    className="group flex flex-row items-center gap-2"
                >
                    <h2 className="text-4xl">Events</h2>
                    <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-all duration-300" />
                </Link>
            </h2>
            <Carousel events={events} />
            <div className="mt-10">
                <EventActivityCalendar events={events} />
            </div>
        </motion.div>
    );
};
