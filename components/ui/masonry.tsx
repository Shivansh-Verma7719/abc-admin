import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Download, Share2 } from 'lucide-react';
import { Button, PressEvent } from '@heroui/react';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
    const get = useCallback(() => {
        // Check if we're in the browser environment
        if (typeof window === 'undefined') return defaultValue;
        return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
    }, [queries, values, defaultValue]);

    const [value, setValue] = useState<number>(defaultValue);

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        // Set initial value
        setValue(get());

        const handler = () => setValue(get());
        queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    }, [queries, get]);

    return value;
};

const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            src =>
                new Promise<void>(resolve => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

interface Item {
    id: string;
    img: string;
    height: number;
    caption?: string;
}

interface GridItem extends Item {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MasonryProps {
    items: Item[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
    onItemClick?: (item: Item) => void;
}

const Masonry: React.FC<MasonryProps> = ({
    items,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false,
    onItemClick
}) => {
    const columns = useMedia(
        ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);

    useEffect(() => {
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    const handleItemClick = (item: Item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    const handleShare = async (item: Item) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.caption || 'Check out this image',
                    text: `Check out this image: ${item.caption || ''}`,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleDownload = (item: Item) => {
        window.open(item.img, '_blank');
    };

    const grid = useMemo<{ items: GridItem[], containerHeight: number }>(() => {
        if (!width) return { items: [], containerHeight: 0 };
        const colHeights = new Array(columns).fill(0);
        const gap = 16;
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        const gridItems = items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const height = child.height / 2;
            const y = colHeights[col];

            colHeights[col] += height + gap;
            return { ...child, x, y, w: columnWidth, h: height };
        });

        // Calculate the total height needed (tallest column)
        const containerHeight = Math.max(...colHeights);

        return { items: gridItems, containerHeight };
    }, [columns, items, width]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady) return;

        const getInitialPositionForItem = (item: GridItem) => {
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return { x: item.x, y: item.y };

            let direction = animateFrom;
            if (animateFrom === 'random') {
                const dirs = ['top', 'bottom', 'left', 'right'];
                direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
            }

            switch (direction) {
                case 'top':
                    return { x: item.x, y: -200 };
                case 'bottom':
                    return { x: item.x, y: window.innerHeight + 200 };
                case 'left':
                    return { x: -200, y: item.y };
                case 'right':
                    return { x: window.innerWidth + 200, y: item.y };
                case 'center':
                    return {
                        x: containerRect.width / 2 - item.w / 2,
                        y: containerRect.height / 2 - item.h / 2
                    };
                default:
                    return { x: item.x, y: item.y + 100 };
            }
        };

        grid.items.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

            if (!hasMounted.current) {
                const start = getInitialPositionForItem(item);
                gsap.fromTo(
                    selector,
                    {
                        opacity: 0,
                        x: start.x,
                        y: start.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(10px)' })
                    },
                    {
                        opacity: 1,
                        ...animProps,
                        ...(blurToFocus && { filter: 'blur(0px)' }),
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                gsap.to(selector, {
                    ...animProps,
                    duration,
                    ease,
                    overwrite: 'auto'
                });
            }
        });

        hasMounted.current = true;
    }, [grid.items, grid.containerHeight, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, containerRef]);

    const handleMouseEnter = (id: string, element: HTMLElement) => {
        if (scaleOnHover) {
            gsap.to(`[data-key="${id}"]`, {
                scale: hoverScale,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay') as HTMLElement;
            if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
        }
    };

    const handleMouseLeave = (id: string, element: HTMLElement) => {
        if (scaleOnHover) {
            gsap.to(`[data-key="${id}"]`, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay') as HTMLElement;
            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
        }
    };
    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: grid.containerHeight || 'auto' }}
        >
            {grid.items.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="absolute box-content group cursor-pointer"
                    style={{ willChange: 'transform, width, height, opacity' }}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
                >
                    <div
                        className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] text-[10px] leading-[10px] overflow-hidden"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Caption */}
                        {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-semibold text-sm ">{item.caption}</p>
                            </div>
                        )}

                        {/* Share and Download Buttons */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                onPress={() => handleShare(item)}
                                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                                title="Share"
                                isIconOnly
                            >
                                <Share2 className="w-4 h-4 text-gray-800" />
                            </Button>
                            <Button
                                onPress={() => handleDownload(item)}
                                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                                title="Download"
                                isIconOnly
                            >
                                <Download className="w-4 h-4 text-gray-800" />
                            </Button>
                        </div>

                        {colorShiftOnHover && (
                            <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Masonry;