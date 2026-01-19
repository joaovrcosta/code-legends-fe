"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { NewsBanner } from "./news-banner";

export function NewsBannerCarousel() {
    return (
        <div className="relative w-full">
            {/* Fade direita */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-0 sm:w-8 md:w-12 lg:w-20 xl:w-32 bg-gradient-to-l from-[#121214] to-transparent z-10" />

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {[1, 2, 3].map((item) => (
                        <CarouselItem
                            key={item}
                            className="pl-2 md:pl-4 basis-[85%] sm:basis-[80%] md:basis-[75%] lg:basis-[85%]"
                        >
                            <NewsBanner />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
