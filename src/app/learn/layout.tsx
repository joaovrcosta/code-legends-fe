import { FooterFixed } from "@/components/learn/footer-fixed";
import LearnHeader from "@/components/learn/header";
import Sidebar from "@/components/learn/sidebar";
import { getActiveCourse } from "@/actions/user/get-active-course";
import { getUserEnrolledList } from "@/actions/progress";

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enrolledCoursesData, activeCourse] = await Promise.all([
    getUserEnrolledList(),
    getActiveCourse(),
  ]);

  return (
    <div className="h-[100dvh] w-full flex flex-col">
      <LearnHeader
        initialUserCourses={enrolledCoursesData.userCourses || []}
        initialActiveCourse={activeCourse}
      />

      <div className="flex flex-1 lg:pt-[79px] pt-[64px]">
        <div className="lg:block hidden max-w-64">
          <Sidebar />
        </div>

        <div className="flex-1 h-[calc(100dvh-100px)] lg:h-[calc(100dvh-80px)] overflow-y-auto pt-0 pb-4">
          <main className="w-full">{children}</main>
          <FooterFixed />
        </div>
      </div>
    </div>
  );
}
