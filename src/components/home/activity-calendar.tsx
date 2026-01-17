"use client";

import { useEffect, useMemo, useState } from "react";

interface ActivityData {
    date: string; // formato YYYY-MM-DD
    count: number; // número de atividades no dia (0-4 para diferentes intensidades)
}

interface ActivityCalendarProps {
    activities?: ActivityData[];
}

// Função para gerar dados de exemplo se não fornecidos
// Usa um seed fixo para garantir consistência entre servidor e cliente
function generateSampleData(seed: number = 12345): ActivityData[] {
    const activities: ActivityData[] = [];
    const today = new Date();

    // Função de random com seed para garantir consistência
    let currentSeed = seed;
    function seededRandom() {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
    }

    // Gera dados para os últimos 3 meses
    for (let i = 90; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Simula atividade aleatória (30% de chance de ter atividade)
        if (seededRandom() > 0.7) {
            activities.push({
                date: date.toISOString().split("T")[0],
                count: Math.floor(seededRandom() * 4) + 1, // 1-4 atividades
            });
        }
    }

    return activities;
}

// Função para obter a cor baseada na intensidade
function getActivityColor(count: number): string {
    if (count === 0) return "bg-[#25252A]"; // Sem atividade
    if (count === 1) return "bg-[#003D4F]"; // Pouca atividade (azul muito escuro)
    if (count === 2) return "bg-[#004E63]"; // Média atividade (azul escuro)
    if (count === 3) return "bg-[#006D8F]"; // Boa atividade (azul médio)
    return "bg-[#00C8FF]"; // Muita atividade (ciano brilhante)
}

// // Função para agrupar atividades por mês
// function groupByMonth(activities: ActivityData[]) {
//     const grouped: { [key: string]: ActivityData[] } = {};

//     activities.forEach((activity) => {
//         const date = new Date(activity.date);
//         const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

//         if (!grouped[monthKey]) {
//             grouped[monthKey] = [];
//         }
//         grouped[monthKey].push(activity);
//     });

//     return grouped;
// }

// Função para gerar grid de um mês (5 colunas x 7 linhas = 35 células)
function generateMonthGrid(year: number, month: number, activities: ActivityData[]) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 = domingo, 6 = sábado

    // Cria um mapa de atividades por data
    const activityMap = new Map<string, number>();
    activities.forEach((activity) => {
        const activityDate = new Date(activity.date);
        if (activityDate.getFullYear() === year && activityDate.getMonth() === month) {
            activityMap.set(activity.date, activity.count);
        }
    });

    const grid: Array<{ date: number | null; count: number }> = [];

    // Preenche células vazias antes do primeiro dia do mês
    for (let i = 0; i < startDayOfWeek; i++) {
        grid.push({ date: null, count: 0 });
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const count = activityMap.get(dateStr) || 0;
        grid.push({ date: day, count });
    }

    // Preenche células vazias após o último dia do mês para completar 35 células
    while (grid.length < 35) {
        grid.push({ date: null, count: 0 });
    }

    return grid;
}

export function ActivityCalendar({ activities }: ActivityCalendarProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const activityData = useMemo(() => {
        if (activities) {
            return activities;
        }
        // Usa seed fixo para garantir consistência entre servidor e cliente
        return generateSampleData(12345);
    }, [activities]);

    // Obtém os últimos 3 meses
    const months = useMemo(() => {
        const today = new Date();
        const monthsList = [];

        for (let i = 2; i >= 0; i--) {
            const date = new Date(today);
            date.setMonth(date.getMonth() - i);
            monthsList.push({
                year: date.getFullYear(),
                month: date.getMonth(),
                monthName: date.toLocaleDateString("pt-BR", { month: "short" }),
            });
        }

        return monthsList;
    }, []);

    // Renderiza placeholder no servidor para evitar hydration mismatch
    if (!isMounted) {
        return (
            <div className="space-y-4">
                <div className="flex gap-4 justify-between">
                    {months.map(({ year, month, monthName }) => (
                        <div key={`${year}-${month}`} className="flex flex-col flex-1">
                            <h3 className="text-white text-sm font-medium mb-2 capitalize">
                                {monthName}
                            </h3>
                            <div className="grid grid-cols-5 gap-1">
                                {Array.from({ length: 35 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-3 h-3 rounded-sm bg-[#25252A]"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legenda */}
                <div className="flex items-center gap-2 text-xs text-[#C4C4CC]">
                    <span>Menos</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#25252A]" />
                        <div className="w-3 h-3 rounded-sm bg-[#003D4F]" />
                        <div className="w-3 h-3 rounded-sm bg-[#004E63]" />
                        <div className="w-3 h-3 rounded-sm bg-[#006D8F]" />
                        <div className="w-3 h-3 rounded-sm bg-[#00C8FF]" />
                    </div>
                    <span>Mais</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-4 justify-between">
                {months.map(({ year, month, monthName }) => {
                    const monthActivities = activityData.filter((activity) => {
                        const activityDate = new Date(activity.date);
                        return (
                            activityDate.getFullYear() === year &&
                            activityDate.getMonth() === month
                        );
                    });

                    const grid = generateMonthGrid(year, month, monthActivities);

                    return (
                        <div key={`${year}-${month}`} className="flex flex-col flex-1">
                            <h3 className="text-white text-sm font-medium mb-2 capitalize">
                                {monthName}
                            </h3>
                            <div className="grid grid-cols-5 gap-1">
                                {grid.map((cell, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-sm ${getActivityColor(cell.count)}`}
                                        title={
                                            cell.date
                                                ? `${cell.date}/${month + 1}/${year}: ${cell.count} atividades`
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legenda */}
            <div className="flex items-center gap-2 text-xs text-[#C4C4CC]">
                <span>Menos</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-[#25252A]" />
                    <div className="w-3 h-3 rounded-sm bg-[#003D4F]" />
                    <div className="w-3 h-3 rounded-sm bg-[#004E63]" />
                    <div className="w-3 h-3 rounded-sm bg-[#006D8F]" />
                    <div className="w-3 h-3 rounded-sm bg-[#00C8FF]" />
                </div>
                <span>Mais</span>
            </div>
        </div>
    );
}
