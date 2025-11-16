"use client";

import { ArrowRightIcon, PartyPopper } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { motion } from 'motion/react';
import { Courses } from "@/components/marketing/hero/courses";

const Hero = () => {
    return (
        <div>
            <div className="relative overflow-x-hidden flex flex-col items-center px-5">
                <div className="relative z-10 flex flex-col items-center justify-center pt-30">
                    <div >
                        <div className="mb-8 rounded-full bg-accent py-1 pl-1 pr-3 text-sm flex items-center gap-2">
                            <Link
                                href="/docs/primitives/effects/image-zoom"
                                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
                            >
                                <span className="h-6 px-2 bg-primary text-xs text-primary-foreground rounded-full flex gap-1 items-center justify-center">
                                    New
                                    <PartyPopper className="size-3.5" />
                                </span>{' '}
                                <span>Image Zoom Effect</span>
                            </Link>
                        </div>
                    </div>

                    <div
                    >
                        <div className="relative z-10">
                            <h1 className="md:max-w-[800px] max-w-[320px]">
                                <p className="block md:text-5xl text-4xl font-medium text-center text-neutral-200 dark:text-neutral-800">Animate your UI with smooth style
                                </p>
                            </h1>

                        </div>
                    </div>

                    <div
                    >
                        <p className="block font-normal md:text-lg sm:text-base text-sm text-center mt-3 text-muted-foreground md:max-w-[660px] sm:max-w-[450px] text-balance">
                            A fully animated, open-source React component distribution. Browse a
                            list of animated primitives, components and icons you can install
                            and use in your projects.
                        </p>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mt-5 mb-8 max-sm:w-full">
                        <div
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="w-full !pr-5"
                                    variant="default"
                                    asChild
                                >
                                    <Link href="/docs/installation">
                                        Get Started <ArrowRightIcon className="!size-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>


                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="w-full" variant="glow" asChild>
                                <Link href="/docs/components">Browse Components</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Courses />
        </div>
    )
};

export default Hero
