// components/HeroSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";

const images = {
    leftMost: "https://picsum.photos/600",
    secondLeft: "https://picsum.photos/600",
    center: "https://picsum.photos/600",
    secondRight: "https://picsum.photos/600",
    rightMost: "https://picsum.photos/600"
}

export default function HeroSection() {
    return (
        <section className="relative px-4">
            {/* Top text center */}
            <motion.div
                className="max-w-4xl mx-auto text-center pt-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Ashoka Business Club
                    {/* <br /> */}
                    {/* <span style={{ color: "#0F3C3D" }}>with Latest Technology</span> */}
                </motion.h1>
                <motion.p
                    className="mt-6 text-foreground text-base sm:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    Welcome to the Ashoka Business Club, where innovation meets opportunity. Join us in shaping the future of business.
                </motion.p>
            </motion.div>

            {/* main cards row */}
            <div className="mt-8 sm:mt-12 relative">
                {/* Mobile Layout - 3 on top, 2 on bottom */}
                <div className="block sm:hidden">
                    {/* Top row - 3 images */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        {/* left image card */}
                        <motion.div
                            className="col-span-1"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        >
                            <motion.div
                                className="rounded-lg overflow-hidden shadow-lg"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-40">
                                    <Image
                                        src={images.leftMost}
                                        alt="hero image"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="33vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* center card */}
                        <motion.div
                            className="col-span-1 flex justify-center"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                        >
                            <motion.div
                                className="rounded-lg w-full h-30 mt-auto overflow-hidden shadow-lg"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images.center}
                                        alt="analytics"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="33vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* right card */}
                        <motion.div
                            className="col-span-1 flex justify-end"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                        >
                            <motion.div
                                className="rounded-lg w-full h-40 overflow-hidden shadow"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images.rightMost}
                                        alt="efficiency and productivity"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="33vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Bottom row - 2 images centered */}
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        {/* second left card */}
                        <motion.div
                            className="col-span-1 flex justify-center"
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        >
                            <motion.div
                                className="rounded-lg w-[90%] ml-auto h-36 overflow-hidden shadow"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images.secondLeft}
                                        alt="clients and partners"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="30vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* second right card */}
                        <motion.div
                            className="col-span-1 flex justify-center"
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        >
                            <motion.div
                                className="rounded-lg w-[90%] mr-auto h-36 overflow-hidden shadow"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images.secondRight}
                                        alt="years of service"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="30vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Desktop Layout - Original 5 cards in a row */}
                <div className="hidden sm:grid sm:grid-cols-5 gap-6 items-end">
                    {/* left image card */}
                    <motion.div
                        className="col-span-1"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-2xl overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-[340px] lg:h-[380px]">
                                <Image
                                    src={images.leftMost}
                                    alt="industrial pipes"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(min-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* second left card */}
                    <motion.div
                        className="col-span-1 justify-center"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-2xl w-64 h-56 overflow-hidden shadow"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={images.secondLeft}
                                    alt="clients and partners"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(min-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* center card */}
                    <motion.div
                        className="col-span-1 flex justify-center -translate-y-8"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-2xl w-80 h-56 overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={images.center}
                                    alt="analytics"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(min-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* second right card */}
                    <motion.div
                        className="col-span-1 justify-center translate-y-2"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-2xl w-56 h-52 overflow-hidden shadow"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={images.secondRight}
                                    alt="years of service"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(min-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* right card */}
                    <motion.div
                        className="col-span-1 flex justify-end"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-2xl w-64 h-80 overflow-hidden shadow"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={images.rightMost}
                                    alt="efficiency and productivity"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(min-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
