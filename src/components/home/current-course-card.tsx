import { getActiveCourse } from "@/actions/user/get-active-course";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { BarbellIcon } from "@phosphor-icons/react/dist/ssr";
import { ContinueCourseButton } from "./continue-course-button";
import { getUserCourseProgress } from "@/actions/progress";

export async function CurrentCourseCard() {
    const activeCourse = await getActiveCourse();
    const userProgress = await getUserCourseProgress(activeCourse?.slug || "");

    if (!activeCourse) {
        return null;
    }

    return (
        <div className="">
            {/* Tag FORMAÇÃO */}

            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="flex flex-col lg:items-start items-center flex-1 mb-5">
                    <div className="flex lg:justify-start justify-center mb-6">
                        <span className="bg-transparent text-[#737373] border border-[#737373] text-xs font-medium px-3 py-1 rounded-full">
                            FORMAÇÃO
                        </span>
                    </div>
                    <div className="relative flex-shrink-0 flex flex-row items-center justify-center left-[-8px]">
                        <Image
                            src={activeCourse.icon}
                            alt={activeCourse.title}
                            width={28}
                            height={28}
                            className="object-cover h-12 w-12"
                        />
                        <h2 className="text-white text-2xl font-medium">
                            {activeCourse.title}
                        </h2>

                    </div>
                    <div className="flex items-center gap-4 w-[240px] lg:mt-0 mt-5">
                        <Progress
                            value={userProgress?.course.progress ?? 0}
                            className="w-full bg-[#25252A] h-[2px]"
                        />
                        <p className="text-sm text-center">
                            {Math.round(userProgress?.course.progress ?? 0)}%
                        </p>
                        {/* <Trophy size={32} weight="fill" className="text-[#25252A]" /> */}
                    </div>
                    <div className="lg:block hidden mt-4">
                        <button
                            type="button"
                            className="flex items-center h-[42px] gap-2 px-4 py-2 bg-[#222226] hover:bg-[#2E2E32] text-white text-sm rounded-[12px] transition-colors"
                        >
                            <BarbellIcon size={18} className="text-[#FF6200]" weight="fill" />
                            Pratique
                        </button>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className="flex items-center lg:justify-end justify-center lg:mb-0 mb-5 w-full">
                    <div className="flex items-center gap-3 lg:w-[228px] w-full">
                        <div className="flex-1">
                            <ContinueCourseButton
                                courseId={activeCourse.id}
                                courseSlug={activeCourse.slug}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="pt-4 border-t border-[#25252A] flex items-center lg:justify-start justify-center">
                <p className="text-[#737373] text-sm text-center">
                    Parte da jornada front-end{" "}
                    <Link
                        href={`/learn/paths/${activeCourse.slug}`}
                        className="text-[#00C8FF] hover:underline"
                    >
                        Programa de estudos
                    </Link>
                </p>
            </div>
        </div>
    );
}