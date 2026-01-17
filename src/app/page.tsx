import { listCourses } from "@/actions/course";
import { CurrentCourseCard } from "@/components/home/current-course-card";
import { CategoriesCarousel } from "@/components/learn/catolog/categories-carousel";
import { RecommendationsCarousel } from "@/components/learn/catolog/recommendations-carousel";
import { Lightning, CaretRight, Flame } from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/actions/user/get-current-user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { ActivityCalendar } from "@/components/home/activity-calendar";
import { NewsBannerCarousel } from "@/components/home/news-banner-carousel";

export default async function Home() {
  const courses = await listCourses();
  // const { userCourses } = await getUserEnrolledList();
  const user = await getCurrentUser();

  const firstName = user?.name?.split(" ")[0] || "Usuário";

  return (
    <div className="w-full p-6">
      <div className="flex max-w-[1520px] p-6 pb-10 gap-8 md:gap-10 mx-auto">
        {/* Conteúdo principal - Esquerda */}
        <div className="flex-1 flex flex-col items-start">

          {/* Novidades */}
          <div className="flex items-start space-x-2 mb-4 w-full">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Novidades
            </span>
          </div>

          {/* Carrossel */}
          <div className="w-full relative px-0 overflow-hidden">
            <NewsBannerCarousel />
          </div>

          {/* Seus cursos e Catálogo */}
          <div className="w-full">
            <div className="flex items-center space-x-2 pb-4 pt-8">
              <span className="text-muted-foreground text-[14px] font-semibold">
                Trilha atual
              </span>
            </div>
            <CurrentCourseCard />

            {/* Catálogo */}
            <div>
              <div className="flex items-center space-x-2 py-4 pt-8">
                <span className="text-muted-foreground text-[14px] font-semibold">
                  Recomendações
                </span>
              </div>
              <RecommendationsCarousel courses={courses.courses} />
            </div>
            <div className="flex items-center space-x-2 py-4 mt-4">
              <span className="text-muted-foreground text-[14px] font-semibold">
                Categorias
              </span>
            </div>
            <div className="pb-4">
              <CategoriesCarousel />
            </div>
          </div>
        </div>

        <div className="max-w-[360px] w-[500px] flex-shrink-0 self-stretch mt-9 flex flex-col gap-8 sticky top-[32px] h-fit">
          <div className="bg-[#1A1A1E] p-6 border border-[#25252A] rounded-[20px] w-full">
            <div className=" flex justify-between">
              <h1 className="text-white text-xl font-medium">Olá, {firstName}</h1>
              <div className="flex items-center gap-2">
                <Lightning size={24} weight="fill" className="text-[#FF6200]" />
                PRO
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              {/* Avatar com borda gradiente */}
              <div className="relative flex-shrink-0">
                <div
                  className="p-[4px] rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #00D9FF 0%, #00C8FF 25%, #7B61FF 50%, #A855F7 75%, #00D9FF 100%)"
                  }}
                >
                  <div className="bg-[#1A1A1E] rounded-full p-[6px]">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user?.avatar || undefined} />
                      <AvatarFallback className="bg-[#25252A] text-white text-lg font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              {/* Botão Meu perfil */}
              <Link href="/account" className="flex-1">
                <button className="w-full h-[44px] bg-blue-gradient-500 hover:opacity-90 transition-all rounded-full text-white font-medium text-sm flex items-center justify-center">
                  Meu perfil
                </button>
              </Link>
            </div>
            <div className="mt-6">
              <div>
                <p>Nivel 122</p>
              </div>
              <div>
                <div className="flex items-center gap-4 w-full">
                  <Progress
                    value={82}
                    className="w-full bg-[#25252A] h-[2px]"
                  />
                  <p className="text-sm text-center">
                    {Math.round(85)}%
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <ActivityCalendar />
              </div>
              <div className="mt-6">
                <Link
                  href="/learn/badges"
                  className="flex items-center justify-between py-4 border-b border-[#25252A] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="text-[#C4C4CC] text-sm font-medium">
                    Ver Meus Emblemas
                  </span>
                  <CaretRight size={16} className="text-[#C4C4CC]" weight="regular" />
                </Link>
                <Link
                  href="/learn/tracking"
                  className="flex items-center justify-between py-4 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="text-[#C4C4CC] text-sm font-medium">
                    Ver Meu Progresso
                  </span>
                  <CaretRight size={16} className="text-[#C4C4CC]" weight="regular" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1A1E] border border-[#25252A] rounded-[20px] w-full p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={24} weight="fill" className="text-[#FF6200]" />
              <span className="text-white text-lg font-semibold">Streak</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">0</span>
              <span className="text-sm text-[#C4C4CC]">dias</span>
            </div>
            <p className="text-xs text-[#737373] mt-2">
              Assista uma aula para aumentar seu streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
