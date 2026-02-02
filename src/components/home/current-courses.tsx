import { getUserEnrolledList } from "@/actions/progress";
import { KeepLearningCard } from "./keep-learning-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export async function CurrentCourses() {
    const { userCourses } = await getUserEnrolledList();

    if (userCourses.length === 0) return null;

    const glowColors: Array<"blue" | "purple" | "orange" | "green"> = ["blue", "purple"];

    return (
        <div className="flex flex-col gap-4 w-full relative">
            <h2 className="text-muted-foreground text-sm font-semibold mb-2 mt-4">
                Continuar aprendendo
            </h2>

            {/* FADE NA DIREITA:
                1. absolute right-0: Fixa na extremidade direita.
                2. bg-gradient-to-l: Gradiente da direita (cor sólida) para a esquerda (transparente).
                3. pointer-events-none: Permite clicar nos botões ou cards por baixo do fade.
                4. z-10: Garante que fique acima dos cards.
            */}
            <div className="pointer-events-none absolute right-0 top-10 h-[calc(100%-40px)] w-20 bg-gradient-to-l from-[#121214] via-[#121214]/80 to-transparent z-10" />

            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {userCourses.map((course, index) => (
                        <CarouselItem
                            key={course.id}
                            className="pl-4 basis-[256px] md:basis-[316px]"
                        >
                            <div className="h-full w-full">
                                <KeepLearningCard
                                    course={course}
                                    glowColor={glowColors[index % glowColors.length] || "blue"}
                                    progress={course.progress}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}