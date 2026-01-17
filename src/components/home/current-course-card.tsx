import { getActiveCourse } from "@/actions/user/get-active-course";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Progress } from "../ui/progress";
import { BarbellIcon, Trophy } from "@phosphor-icons/react/dist/ssr";

export async function CurrentCourseCard() {
    const activeCourse = await getActiveCourse();

    if (!activeCourse) {
        return null;
    }

    const progress = Math.round(activeCourse.progress || 0);

    return (
        <div className="bg-gradient-to-b from-[#1A1A1E] to-[#0a0a0a] border border-[#25252A] rounded-[20px] p-5 relative overflow-hidden">
            {/* Tag FORMAÇÃO */}
            <div className="absolute top-[20px] left-[20px]">
                <span className="bg-transparent text-[#737373] border border-[#737373] text-xs font-medium px-3 py-1 rounded-full">
                    FORMAÇÃO
                </span>
            </div>

            <div className="flex">
                <div className="flex flex-col items-start flex-1 mb-5 mt-10">
                    <div className="relative flex-shrink-0 flex flex-row items-center justify-center left-[-8px]">
                        <Image
                            src="https://xesque.rocketseat.dev/platform/1760965441182.svg"
                            alt={activeCourse.title}
                            width={28}
                            height={28}
                            className="object-cover h-12 w-12"
                        />
                        <h2 className="text-white text-2xl font-medium">
                            {activeCourse.title}
                        </h2>

                    </div>
                    <div className="flex items-center gap-4 w-[240px]">
                        <Progress
                            value={progress ?? 0}
                            className="w-full bg-[#25252A] h-[2px]"
                        />
                        <p className="text-sm text-center">
                            {Math.round(progress ?? 0)}%
                        </p>
                        <Trophy size={32} weight="fill" className="text-[#25252A]" />
                    </div>
                    <div>
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
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3 mb-4 w-[228px]">
                        <Link href={`/learn/paths/${activeCourse.slug}`} className="flex-1">
                            <PrimaryButton className="bg-blue-gradient-500 transition-all rounded-[12px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold px-6 py-2 h-[50px] disabled:opacity-50 border-none">
                                <span className="flex items-center gap-2">
                                    Continuar
                                    <ArrowRight size={18} />
                                </span>
                            </PrimaryButton>

                        </Link>
                    </div>
                </div>

            </div>
            <div className="pt-4 border-t border-[#25252A]">
                <p className="text-[#737373] text-sm">
                    Parte da jornada front-end{" "}
                    <Link
                        href="/learn"
                        className="text-[#00C8FF] hover:underline"
                    >
                        Programa de estudos
                    </Link>
                </p>
            </div>
        </div>
    );
}