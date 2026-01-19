"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { useCourseEnrollment } from "@/hooks/use-course-enrollment";
import { useState, useEffect } from "react";

interface ContinueCourseButtonProps {
    courseId: string;
    courseSlug: string;
    className?: string;
}

export function ContinueCourseButton({
    courseId,
    className = "",
}: ContinueCourseButtonProps) {
    const router = useRouter();
    const { isEnrolled, isLoading, isCheckingEnrollment, handleStartCourse } =
        useCourseEnrollment(courseId);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick: () => Promise<void> = async () => {
        try {
            const redirectPath = await handleStartCourse(
                courseId,
                `/learn`
            );
            if (redirectPath) {
                router.push(redirectPath);
            }
        } catch {
            // Erro já foi logado no hook
        }
    };

    const getButtonText = () => {
        if (!mounted) return "Continuar";
        if (isLoading) return "Carregando...";
        if (isCheckingEnrollment) return "Verificando...";
        if (isEnrolled) return "Continuar";
        return "Inscrever";
    };

    return (
        <PrimaryButton
            onClick={handleClick}
            disabled={isLoading || isCheckingEnrollment}
            className={`w-full bg-blue-gradient-500 transition-all rounded-full lg:text-[18px] text-[14px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold px-6 py-2 lg:h-[50px] h-[42px] disabled:opacity-50 border-none ${className}`}
            suppressHydrationWarning
        >
            <span className="flex items-center gap-2">
                <Play size={20} weight="fill" className="text-white" />
                {getButtonText()}
            </span>
        </PrimaryButton>
    );
}
