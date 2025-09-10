'use client'

import React, { useState, useMemo } from 'react'
import ActivityCalendar, { Activity } from 'react-activity-calendar'
import { Tooltip, Card, CardBody, CardHeader, Button, Chip } from '@heroui/react'
import { X, Calendar, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Event } from '@/types/events'

interface ActivityCalendarProps {
    events: Event[]
}

export default function EventActivityCalendar({ events }: ActivityCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [sideCardOpen, setSideCardOpen] = useState(false)

    // animation timing (use same value for layout duration & clearing selectedDate)
    const LAYOUT_DURATION = 0.8 // seconds

    // Generate activity data from August 15th of current year to May 15th of next year
    const activityData = useMemo(() => {
        const today = new Date()
        const currentYear = today.getFullYear()
        const startDate = new Date(currentYear, 7, 15) // August 15th (month is 0-indexed)
        const endDate = new Date(currentYear + 1, 4, 15) // May 15th of next year

        const eventCounts = new Map<string, number>()

        events.forEach(event => {
            const eventDate = new Date(event.date)
            if (eventDate >= startDate && eventDate <= endDate) {
                const dateStr = eventDate.toISOString().split('T')[0]
                eventCounts.set(dateStr, (eventCounts.get(dateStr) || 0) + 1)
            }
        })

        const data: Activity[] = []
        const currentDate = new Date(startDate)

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0]
            const count = eventCounts.get(dateStr) || 0
            let level: 0 | 1 | 2 | 3 | 4 = 0
            if (count > 0) {
                level = Math.min(4, count) as 1 | 2 | 3 | 4
            }

            data.push({
                date: dateStr,
                count,
                level
            })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return data
    }, [events])

    const selectedDateEvents = useMemo(() => {
        if (!selectedDate) return []
        return events.filter(event => {
            const eventDate = new Date(event.date).toISOString().split('T')[0]
            return eventDate === selectedDate
        })
    }, [selectedDate, events])

    const handleDateClick = (data: Activity) => {
        setSelectedDate(data.date)
        setSideCardOpen(true)
    }

    const closeSideCard = () => {
        // hide the side card visually — keep DOM mounted
        setSideCardOpen(false)

        // clear selectedDate after the layout animation completes to avoid content changes while animating
        window.setTimeout(() => {
            setSelectedDate(null)
        }, LAYOUT_DURATION * 1000 + 60) // small buffer
    }

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    return (
        <div className="relative w-full h-full">
            <div className="flex flex-col lg:flex-row items-start gap-6 p-6 bg-background rounded-lg transition-all ease-in-out">

                {/* ===== LEFT: Calendar (motion layout) ===== */}
                <motion.div
                    layout
                    transition={{
                        // layout-specific timing controls resizing duration & easing
                        layout: { duration: LAYOUT_DURATION, ease: [0.2, 0.8, 0.2, 1] },
                        // gentle spring for other animated props if any
                        type: 'spring',
                        stiffness: 1000,
                        damping: 500
                    }}
                    className={`flex flex-col items-center gap-6 w-full ${sideCardOpen ? 'lg:w-2/3' : 'lg:w-full'}`}
                >
                    <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        Event Calendar
                    </h3>

                    <div className="w-full mx-auto overflow-x-auto">
                        <ActivityCalendar
                            data={activityData}
                            theme={{
                                light: ['#3a5f7d', '#C24D4D', '#B93333', '#B11919', '#a80000'],
                                dark: ['#3a5f7d', '#C24D4D', '#B93333', '#B11919', '#a80000'],
                            }}
                            colorScheme='light'
                            blockSize={20}
                            blockMargin={10}
                            fontSize={12}
                            blockRadius={20}
                            style={{
                                margin: '0 auto',
                            }}
                            hideColorLegend={false}
                            hideMonthLabels={false}
                            hideTotalCount={false}
                            renderBlock={(block, level) => (
                                <Tooltip
                                    key={block.key}
                                    content={
                                        <div className="p-2">
                                            <p className="font-medium">{formatDate(level.date)}</p>
                                            <p className="text-sm text-gray-600">
                                                {level.count === 0 ? 'No events' : `${level.count} event${level.count > 1 ? 's' : ''}`}
                                            </p>
                                        </div>
                                    }
                                    placement="top"
                                >
                                    {block}
                                </Tooltip>
                            )}
                            labels={{
                                totalCount: '{{count}} events in AY {{year}}',
                            }}
                            eventHandlers={{
                                onClick: event => (activity) => {
                                    handleDateClick(activity)
                                }
                            }}
                        />
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        Click on any day to see events for that date
                    </p>
                </motion.div>

                {/* ===== RIGHT: Side card wrapper (always mounted) ===== */}
                <motion.div
                    // animate the wrapper's width between a usable width and zero on large screens
                    layout
                    transition={{ layout: { duration: LAYOUT_DURATION - 0.1, ease: [0.2, 0.8, 0.2, 1] } }}
                    // When closed -> collapse on lg screens to 0 width; when open -> 1/3 width with min width
                    className={`w-full overflow-hidden ${sideCardOpen ? 'lg:w-1/3 lg:min-w-[300px]' : 'lg:w-0 h-0 lg:min-w-0'}`}
                >
                    {/* inner content gets its own visual animation (opacity/translate). 
              When collapsed, wrapper's width -> 0 hides the content visually, but we also animate opacity/translate
          */}
                    <motion.div
                        animate={sideCardOpen ? { opacity: 1, x: 0, pointerEvents: 'auto' } : { opacity: 0, x: 12, pointerEvents: 'none' }}
                        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                        style={{ originX: 1 }}
                        className="w-full h-full"
                    >
                        {/* Keep the Card mounted; wrapper controls layout */}
                        <Card className="h-[320px] shadow-lg border bg-background flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
                                <h4 className="text-lg font-semibold text-foreground">Events</h4>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={closeSideCard}
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close events panel"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardHeader>

                            <CardBody className="pt-0 flex flex-col flex-1 min-h-0">
                                {selectedDate && (
                                    <div className="mb-4  rounded-lg flex-shrink-0">
                                        <p className="text-sm text-gray-600 mb-1">Selected Date</p>
                                        <p className="font-medium text-sm">{formatDate(selectedDate)}</p>
                                    </div>
                                )}

                                <div className="space-y-3 overflow-y-auto flex-1 max-h-[calc(100%_-_theme(space.4))]">
                                    {selectedDateEvents.length === 0 ? (
                                        <div className="text-center py-6">
                                            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 text-sm">No events scheduled for this date</p>
                                        </div>
                                    ) : (
                                        selectedDateEvents.map((event, index) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: sideCardOpen ? 1 : 0, y: sideCardOpen ? 0 : 6 }}
                                                transition={{ duration: 0.18, delay: index * 0.03 }}
                                                className="p-3 border rounded-lg hover:shadow-sm transition-all duration-200 ease-in-out"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h5 className="font-semibold text-sm text-foreground line-clamp-2">{event.name}</h5>
                                                        {event.category && (
                                                            // <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">
                                                            //     {event.category}
                                                            // </span>
                                                            <Chip color='primary' variant='flat'>{event.category}</Chip>
                                                        )}
                                                    </div>

                                                    {event.one_liner && <p className="text-xs text-gray-600 line-clamp-2">{event.one_liner}</p>}

                                                    <div className="space-y-1 text-xs text-gray-500">
                                                        {event.time && (
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{event.time}</span>
                                                            </div>
                                                        )}
                                                        {event.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-3 h-3" />
                                                                <span className="line-clamp-1">{event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {event.register && (
                                                        <Button
                                                            as="a"
                                                            href={event.register}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            size="sm"
                                                            color="primary"
                                                            className="mt-2 w-full text-xs"
                                                        >
                                                            Register
                                                        </Button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
