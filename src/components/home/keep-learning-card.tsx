"use client";

import type { EnrolledCourse } from "@/types/user-course.ts";
import Image from "next/image";
import { Play } from "lucide-react";
import { Progress } from "../ui/progress";
import { useRouter } from "next/navigation";
import { startCourse } from "@/actions/course/start";
import { getCourseRoadmapFresh } from "@/actions/course";
import { findLessonContext, generateLessonUrl } from "@/utils/lesson-url";
import type { Lesson } from "@/types/roadmap";
import { useState } from "react";

interface KeepLearningCardProps {
    course: EnrolledCourse;
    glowColor?: "blue" | "purple" | "orange" | "green";
    progress: number;
}

export function KeepLearningCard({ course, glowColor = "blue", progress }: KeepLearningCardProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const textColors = {
        blue: "text-[#00C8FF]",
        purple: "text-[#6600E5]",
        orange: "text-[#FF4500]",
        green: "text-[#00FF00]",
    };

    // Converter progresso de decimal (0-1) para porcentagem (0-100)
    // Se o valor já estiver entre 0-100, mantém; se estiver entre 0-1, multiplica por 100
    const progressValue = progress > 1
        ? Math.min(Math.max(Number(progress) || 0, 0), 100)
        : Math.min(Math.max((Number(progress) || 0) * 100, 0), 100);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        try {
            // Primeiro, seta o curso como current
            await startCourse(course.courseId);

            // Busca o roadmap para encontrar a aula atual
            const roadmapData = await getCourseRoadmapFresh(course.courseId);

            if (roadmapData?.modules) {
                // Coleta todas as aulas do roadmap
                const allLessons = roadmapData.modules
                    .flatMap((module) => module?.groups || [])
                    .flatMap((group) => group?.lessons || []);

                // Encontra a aula atual (isCurrent) ou a primeira desbloqueada
                let targetLesson: Lesson | null = null;
                const foundCurrentLesson = allLessons.find((lesson) => lesson.isCurrent);

                // Só usa a aula atual se ela não estiver bloqueada
                if (foundCurrentLesson && foundCurrentLesson.status !== "locked") {
                    targetLesson = foundCurrentLesson;
                } else {
                    // Procura a primeira aula desbloqueada
                    targetLesson = allLessons.find((lesson) => lesson.status !== "locked") || null;
                }

                if (targetLesson) {
                    // Encontra o contexto da aula e gera a URL completa
                    const context = findLessonContext(
                        targetLesson.id,
                        roadmapData.modules
                    );

                    if (context) {
                        const url = generateLessonUrl(
                            targetLesson,
                            context.module,
                            context.group
                        );
                        router.push(url);
                        return;
                    }
                }
            }

            // Fallback: se não conseguir gerar URL, redireciona para /classroom
            router.push("/classroom");
        } catch (error) {
            console.error("Erro ao iniciar curso:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="cursor-pointer"
            onClick={handleClick}
        >
            <div className={`flex items-center gap-4 px-4 py-2 bg-[#151517] rounded-[20px] border border-[#25252A] transition-opacity ${isLoading ? "opacity-50" : ""}`}>
                {/* Ícone hexagonal */}
                <div>
                    <Image
                        src={course.course.icon}
                        alt={course.course.title}
                        width={32}
                        height={32}
                        className="object-cover h-14 w-14"
                    />
                </div>

                {/* Texto */}
                <div className="flex-1 min-w-0">
                    <p className="text-[#C2C2C2] text-[10px] font-light uppercase mb-1">
                        CURSO
                    </p>
                    <h3 className={`font-semibold text-base truncate text-white`}>
                        {course.course.title}
                    </h3>
                </div>

                {/* Botão de play */}
                <button
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25252A] hover:bg-[#2E2E32] flex items-center justify-center transition-colors"
                    disabled={isLoading}
                >
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                </button>
            </div>

            {/* Barra de progresso */}
            <div className="mt-4 w-full flex items-center justify-center">
                <Progress
                    value={progressValue}
                    className="h-[2px] bg-[#25252A] max-w-[164px]"
                />
            </div>
        </div>
    );
}


