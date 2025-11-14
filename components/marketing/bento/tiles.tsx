

import * as React from "react";


import TailwindLogo from "@/components/logos/tailwind";
import FigmaLogo from "@/components/logos/figma";
import { Beam } from "@/components/ui/beam";
import Glow from "@/components/ui/glow";

function TilesIllustration() {
    return (
        <div
            data-slot="tiles-illustration"
            className="relative grid h-[318px] w-[534px] grid-flow-col grid-cols-5 grid-rows-6 gap-6"
        >
            <div className="row-span-2 row-start-2" />
            <div className="fade-left-lg bg-border/40 dark:bg-background/30 z-1 row-span-2 rounded-xl transition-all duration-1000 ease-in-out" />
            <div className="fade-top-lg bg-border/40 dark:bg-background/30 z-1 row-span-2 rounded-xl transition-all duration-1000 ease-in-out" />
            <div className="glass-4 outline-border/30 dark:outline-background/30 relative z-10 row-span-2 flex items-center justify-center rounded-xl to-transparent outline-4 transition-all duration-1000 ease-in-out group-hover:scale-105">
                <Beam tone="brandLight">
                    <div className="text-light relative z-10">
                        <TailwindLogo />
                    </div>
                </Beam>
            </div>
            <div className="fade-bottom-lg bg-border/40 dark:bg-background/30 z-1 row-span-2 rounded-xl transition-all duration-1000 ease-in-out" />
            <div className="glass-4 outline-border/30 dark:outline-background/30 relative z-10 row-span-2 row-start-2 flex items-center justify-center rounded-xl to-transparent outline-4 transition-all duration-1000 ease-in-out group-hover:scale-90">
                <Beam tone="brandLight">
                    <div className="text-light relative z-10">
                        <TailwindLogo />
                    </div>
                </Beam>
            </div>
            <div className="glass-4 outline-border/30 dark:outline-background/30 relative z-10 row-span-2 flex items-center justify-center rounded-xl to-transparent outline-4 transition-all duration-1000 ease-in-out">
                <Beam tone="brandLight">
                    <div className="text-light relative z-10">
                        <TailwindLogo />
                    </div>
                </Beam>
            </div>
            <div className="fade-top-lg bg-border/40 dark:bg-background/30 z-1 row-span-2 rounded-xl transition-all duration-1000 ease-in-out" />
            <div className="glass-4 outline-border/30 dark:outline-background/30 relative z-10 row-span-2 flex items-center justify-center rounded-xl to-transparent outline-4 transition-all duration-1000 ease-in-out group-hover:scale-105">
                <Beam tone="brandLight">
                    <div className="text-light relative z-10">
                        <TailwindLogo />
                    </div>
                </Beam>
            </div>
            <div className="glass-4 outline-border/30 dark:outline-background/30 relative z-10 row-span-2 row-start-2 flex items-center justify-center rounded-xl to-transparent outline-4 transition-all duration-1000 ease-in-out group-hover:scale-[.8]">
                <Beam tone="brandLight">
                    <div className="text-light relative z-10">
                        <FigmaLogo />
                    </div>
                </Beam>
            </div>
            <div className="fade-right-lg bg-border/40 dark:bg-background/30 z-1 row-span-2 rounded-xl transition-all duration-1000 ease-in-out" />
            <Glow
                variant="center"
                className="scale-x-[1.5] opacity-20 transition-all duration-300 group-hover:opacity-30"
            />
        </div>
    );
}

export default TilesIllustration;
