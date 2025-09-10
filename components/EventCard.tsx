// components/EventCard.tsx
"use client";
import Image from "next/image";
import type { Event } from "@/types/events";
import { Card, CardFooter, Button } from "@heroui/react";
import { IconCalendarPlus } from "@tabler/icons-react";
import { formatDate } from "@/utils/date";

interface Props {
    event: Event;
    onRegister?: () => void;
}

export default function EventCard({ event, onRegister }: Props) {
    const formatTime = (time: string) => {
        return time.replace(/:00/g, '');
    }

    return (
        <Card className="shadow-lg group rounded-[1.75rem] bg-gray-100 dark:bg-neutral-900 h-[40rem] w-[22.25rem] md:h-[46.25rem] md:w-[25.313rem] overflow-hidden flex flex-col items-start justify-start relative z-10 hover:scale-[1.02] hover:-translate-y-3 transition-all duration-500">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                    sizes="(min-width: 768px) 320px, 100vw"
                />
            </div>

            {/* BOTTOM PANEL (date/time on top of panel, then title + location + footer content) */}
            <CardFooter className="absolute bottom-0 left-0 right-0 z-10 p-5 rounded-t-3xl bg-gradient-to-br from-abc-blue to-abc-red">
                <div className="w-full flex flex-col items-start text-left space-y-1">
                    {/* date/time row */}
                    {event.date && event.time && (
                        <div className="text-sm text-abc-gold font-bold">
                            {formatTime(event.time)} • {formatDate(event.date)}
                        </div>
                    )}

                    {/* title */}
                    <h3 className="text-xl font-semibold text-white leading-tight">
                        {event.name}
                    </h3>

                    {/* location */}
                    {event.location && (
                        <p className="text-sm text-gray-300">
                            {event.location}
                        </p>
                    )}

                    {/* footer content: register button and floating circular action */}
                    <div className="flex items-center justify-between w-full">
                        <Button
                            variant="solid"
                            size="md"
                            onPress={onRegister}
                            className="bg-abc-gold text-black"
                        >
                            Register
                        </Button>

                        {/* circular floating action */}
                        <Button
                            isIconOnly
                            radius="full"

                            aria-label="save event"
                            className="w-12 h-12 bg-abc-gold"
                        >
                            <IconCalendarPlus className="w-5 h-5 text-black" />
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
