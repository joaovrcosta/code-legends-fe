"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@/components/ui/popover";
import { PrimaryButton } from "../ui/primary-button";
import { FastForward, Lock } from "@phosphor-icons/react/dist/ssr";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Lesson, RoadmapResponse } from "@/types/roadmap";
import { useCourseModalStore } from "@/stores/course-modal-store";
import { generateLessonUrl, findLessonContext } from "@/utils/lesson-url";

export const LessonPopover = ({
  lesson,
  openPopover,
  togglePopover,
  showContinue,
  setShowContinue,
  completed,
  locked,
  allLessons,
  roadmap,
}: {
  lesson: Lesson;
  openPopover: number | null;
  togglePopover: (id: number) => void;
  showContinue: boolean;
  setShowContinue: (state: boolean) => void;
  completed: boolean;
  locked: boolean;
  currentCourseSlug: string;
  allLessons?: Lesson[];
  roadmap?: RoadmapResponse;
  isFirstInModule?: boolean;
}) => {
  const {
    setLessonsForPage,
    setLessonForPage,
    isOpen: isModalOpen,
  } = useCourseModalStore();
  const router = useRouter();

  const handleWatchClick = () => {
    if (!locked) {
      // Tenta gerar URL dinâmica se tiver roadmap
      if (roadmap?.modules) {
        const context = findLessonContext(lesson.id, roadmap.modules);
        if (context) {
          const url = generateLessonUrl(lesson, context.module, context.group);
          router.push(url);
          return;
        }
      }

      // Fallback: atualiza a store e navega para /classroom
      if (allLessons && allLessons.length > 0) {
        const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
        setLessonsForPage(allLessons, currentIndex >= 0 ? currentIndex : 0);
      } else {
        setLessonForPage(lesson);
      }
      router.push("/classroom");
    }
  };

  // O glow só deve aparecer na lição atual
  const shouldShowShadow = lesson.isCurrent;

  console.log("lesson", lesson)

  return (
    <div>
      {showContinue && !isModalOpen ? (
        <Popover open={true}>
          <PopoverTrigger asChild>
            <div
              className={`cursor-pointer w-[64px] h-[64px] rounded-full border-2 flex items-center justify-center bg-[#1a1a1e] ${
                shouldShowShadow ? "shadow-[0_0_24px_#00C8FF]" : ""
              }`}
              style={{
                borderColor: completed
                  ? "#00C8FF"
                  : locked
                  ? "#25252A"
                  : "#00C8FF",
                backgroundColor: completed
                  ? "rgba(0, 200, 255, 0.1)"
                  : locked
                  ? "#1a1a1e"
                  : "rgba(0, 200, 255, 0.05)",
              }}
              onClick={() => {
                setShowContinue(false);
                togglePopover(lesson.id);
              }}
            >
              {completed ? (
                <span className="text-[#00C8FF] text-xs">✓</span>
              ) : locked ? (
                <Lock size={20} className="text-gray-600" />
              ) : (
                <CirclePlay size={24} className="text-[#00C8FF]" />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[120px] cursor-pointer text-center bg-[#121214] rounded-full border-[2px] border-[#25252A] shadow-lg p-2 hover:bg-[#25252A]"
            side="top"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-white text-sm font-semibold">Começar</span>
            </div>
            <PopoverArrow className="fill-[#25252A] mb-3 w-4 h-4 transform translate-y-[-2px]" />
          </PopoverContent>
        </Popover>
      ) : (
        <Popover open={openPopover === lesson.id && !isModalOpen}>
          <PopoverTrigger asChild>
            <div
              className={`cursor-pointer  w-[64px] h-[64px] rounded-full border-2 flex items-center justify-center bg-[#1a1a1e] ${
                shouldShowShadow ? "shadow-[0_0_24px_#00C8FF]" : ""
              }`}
              style={{
                borderColor: completed
                  ? "#00C8FF"
                  : locked
                  ? "#25252A"
                  : "#00C8FF",
                backgroundColor: completed
                  ? "rgba(0, 200, 255, 0.1)"
                  : locked
                  ? "#1a1a1e"
                  : "rgba(0, 200, 255, 0.05)",
              }}
              onClick={() => togglePopover(lesson.id)}
            >
              {completed ? (
                <span className="text-[#00C8FF] text-xs font-bold">✓</span>
              ) : locked ? (
                <Lock size={20} className="text-gray-600" />
              ) : (
                <CirclePlay size={24} className="text-[#00C8FF] " />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[295px] bg-[#1a1a1e] rounded-[20px] border border-[#25252A] shadow-lg p-4">
            <div className="mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                  {lesson.type}
                </span>
                <span className="text-xs text-[#7e7e89]">
                  {lesson.video_duration || "Aula"}
                </span>
              </div>
              <h3 className="text-xl mt-2 text-white">{lesson.title}</h3>
              {lesson.description && (
                <p className="text-sm text-[#7e7e89] mt-1">
                  {lesson.description}
                </p>
              )}
            </div>

            <PrimaryButton disabled={locked} onClick={handleWatchClick}>
              {locked ? "Bloqueado" : completed ? "Revisar" : "Assistir"}
              {locked ? <Lock /> : <CirclePlay />}
            </PrimaryButton>

            {(lesson.type === "project" || lesson.type === "quiz") && (
              <Link href={`/skip-lesson/${lesson.id}`}>
                <PrimaryButton className="mt-2" disabled={locked}>
                  Pular
                  <FastForward size={24} weight="fill" />
                </PrimaryButton>
              </Link>
            )}

            <PopoverArrow className="fill-[#1a1a1e] w-4 h-4 transform translate-y-[-2px]" />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
