"use client";

import { useEffect, useMemo, useState } from "react";

interface ActivityData {
    date: string;
    count: number;
}

interface ActivityCalendarProps {
    activities?: ActivityData[];
}

const generateMockActivities = (): ActivityData[] => {
    const data: ActivityData[] = [];
    const today = new Date();

    for (let i = 0; i < 130; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        const dayOfWeek = date.getDay();
        const random = Math.random();

        let count = 0;
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && random > 0.4) {
            count = Math.floor(Math.random() * 5);
        } else if (random > 0.8) {
            count = 1;
        }

        data.push({ date: dateStr, count });
    }
    return data;
};

function getActivityColor(count: number): string {
    if (count === 0) return "bg-[#212124]";
    if (count === 1) return "bg-[#004B63]";
    if (count === 2) return "bg-[#007EA3]";
    if (count === 3) return "bg-[#00B4D8]";
    return "bg-[#00C8FF]";
}

export function ActivityCalendar({ activities }: ActivityCalendarProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const activityData = useMemo(() => {
        return activities && activities.length > 0 ? activities : generateMockActivities();
    }, [activities]);

    const activityGrid = useMemo(() => {
        const days = [];
        const dataMap = new Map(activityData.map((a) => [a.date, a.count]));

        for (let i = 118; i >= 0; i--) {
            const date = new Date();
            date.setDate(new Date().getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            days.push({
                date: dateStr,
                count: dataMap.get(dateStr) ?? 0,
                month: date.toLocaleDateString("pt-BR", { month: "short" }).toUpperCase().replace(".", ""),
                isFirstDayOfMonth: date.getDate() === 1
            });
        }
        return days;
    }, [activityData]);

    const weeks = useMemo(() => {
        const cols = [];
        for (let i = 0; i < activityGrid.length; i += 7) {
            cols.push(activityGrid.slice(i, i + 7));
        }
        return cols;
    }, [activityGrid]);

    if (!isMounted) return <div className="h-[160px] w-full bg-[#1a1a1e]/50 rounded-xl animate-pulse" />;

    return (
        <div className="w-full overflow-hidden font-sans select-none">
            <div className="flex flex-col gap-3">

                <div className="flex text-[10px] font-bold text-[#737373] h-4 ml-8 mb-1">
                    {weeks.map((week, i) => {
                        if (i === 0 || week.some(d => d.isFirstDayOfMonth)) {
                            const monthLabel = week.find(d => d.isFirstDayOfMonth)?.month || week[0].month;
                            return (
                                <div key={i} className="relative w-full">
                                    <span className="absolute left-0 whitespace-nowrap">{monthLabel}</span>
                                </div>
                            );
                        }
                        return <div key={i} className="w-full" />;
                    })}
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[10px] font-medium text-[#525252] py-1 h-[105px] sm:h-[135px]">
                        <span>Seg</span>
                        <span>Qua</span>
                        <span>Sex</span>
                    </div>

                    <div className="flex-1 flex gap-[4px] sm:gap-[6px] overflow-visible">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[4px] sm:gap-[6px]">
                                {week.map((day) => (
                                    <div
                                        key={day.date}
                                        className={`
                      w-[12px] h-[12px] 
                      sm:w-[16px] sm:h-[15px] 
                      rounded-[3px] transition-all duration-300
                      ${getActivityColor(day.count)}
                      hover:ring-1 hover:ring-white/40 cursor-pointer
                    `}
                                        title={`${day.date}: ${day.count} aulas`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center sm:justify-end mt-4 gap-2 text-[10px] text-[#525252]">
                    <span>Menos</span>
                    <div className="flex gap-[4px]">
                        {[0, 1, 2, 3, 4].map((lvl) => (
                            <div
                                key={lvl}
                                className={`w-[11px] h-[11px] rounded-[2px] ${getActivityColor(lvl)}`}
                            />
                        ))}
                    </div>
                    <span>Mais</span>
                </div>
            </div>
        </div>
    );
}