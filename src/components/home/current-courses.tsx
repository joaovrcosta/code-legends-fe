import { getUserEnrolledList } from "@/actions/progress";
import { KeepLearningCard } from "./keep-learning-card";

export async function CurrentCourses() {
    const { userCourses } = await getUserEnrolledList();

    console.log(userCourses);

    if (!userCourses || userCourses.length === 0) {
        return null;
    }

    // Pega os primeiros 2 cursos com progresso
    const coursesToShow = userCourses
        .filter(course => course.progress > 0)
        .slice(0, 8);

    if (coursesToShow.length === 0) {
        return null;
    }

    const glowColors: Array<"blue" | "purple" | "orange" | "green"> = ["blue", "purple"];

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-muted-foreground text-sm font-semibold mb-2 mt-4">
                Continuar aprendendo
            </h2>
            <div className="flex flex-col gap-4">
                {coursesToShow.map((course, index) => (
                    <KeepLearningCard
                        key={course.id}
                        course={course}
                        glowColor={glowColors[index] || "blue"}
                        progress={course.progress}
                    />
                ))}
            </div>
        </div>
    )
}