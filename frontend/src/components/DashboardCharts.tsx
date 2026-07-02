"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { AnalyticsData } from "@/types";

interface DashboardChartsProps {
  data: AnalyticsData;
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return loading skeletons matching the charts layout
    return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-[24px] p-6 h-[320px] animate-pulse-slow">
            <div className="h-4 w-1/3 bg-secondary rounded mb-6"></div>
            <div className="h-48 bg-secondary rounded-[16px] w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Dark/Light configuration colors
  const isDark = theme === "dark";
  const gridColor = isDark ? "#1F1F24" : "#E4E4E7";
  const textColor = isDark ? "#A1A1AA" : "#71717A";

  // 1. Donut Pie Charts colors setup
  const skillColors = ["#3B82F6", "#7C3AED", "#10B981", "#F59E0B", "#9CA3AF"];
  const trustColors = ["#10B981", "#F59E0B", "#EF4444"];

  interface TooltipPayloadItem {
    name?: string;
    value?: number;
    payload: {
      technology?: string;
      label?: string;
    };
  }

  // Recharts custom tooltips
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border p-2.5 rounded-xl shadow-md text-xs font-semibold text-popover-foreground">
          <p>{`${payload[0].name || payload[0].payload.technology || payload[0].payload.label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full mt-6 select-none">
      
      {/* 1. Technology Adoption Timeline (Line Chart) */}
      <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[340px] transition-colors duration-200">
        <div>
          <h4 className="font-bold text-sm text-foreground">Technology Adoption Timeline</h4>
          <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Shows evolution of key technologies in candidate pool</span>
        </div>
        <div className="h-[210px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeline} margin={{ top: 20, right: 15, left: -25, bottom: 0 }}>
              <XAxis dataKey="year" stroke={textColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={10} tickLine={false} axisLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="adoption_rate"
                stroke="#7C3AED"
                strokeWidth={3}
                dot={{ fill: "#7C3AED", stroke: isDark ? "#0F0F13" : "#FFFFFF", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Visual labels overlay */}
        <div className="flex justify-between text-[9px] font-bold text-primary px-1 mt-1 truncate">
          {data.timeline.map((t, idx) => (
            <span key={idx} title={t.technology}>{t.technology}</span>
          ))}
        </div>
      </div>

      {/* 2. Skills Distribution (Donut Chart) */}
      <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[340px] transition-colors duration-200">
        <div>
          <h4 className="font-bold text-sm text-foreground">Skills Distribution</h4>
          <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Distribution of top skills across candidates</span>
        </div>
        <div className="flex items-center justify-between h-[220px] mt-2">
          {/* Pie graphic */}
          <div className="relative w-1/2 aspect-square flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.skills_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {data.skills_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={skillColors[index % skillColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-black text-foreground leading-none">100,000</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider scale-90 mt-0.5">Candidates</span>
            </div>
          </div>
          {/* Legend */}
          <div className="w-1/2 space-y-1.5 pl-3">
            {data.skills_distribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-[10px] font-bold">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: skillColors[index % skillColors.length] }}
                  />
                  <span className="text-muted-foreground truncate">{entry.name}</span>
                </div>
                <span className="text-foreground shrink-0 pl-1">{entry.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Experience Distribution (Bar Chart) */}
      <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[340px] transition-colors duration-200">
        <div>
          <h4 className="font-bold text-sm text-foreground">Experience Distribution</h4>
          <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Experience range distribution</span>
        </div>
        <div className="h-[210px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.experience_distribution} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="label" stroke={textColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis
                stroke={textColor}
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(tick) => `${tick / 1000}k`}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <span className="text-[9px] text-muted-foreground text-center font-medium mt-1 block">Experience range distribution across processed candidates</span>
      </div>

      {/* 4. Trust Score Distribution (Donut Chart) */}
      <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[340px] transition-colors duration-200">
        <div>
          <h4 className="font-bold text-sm text-foreground">Trust Score Distribution</h4>
          <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Trust score distribution across candidates</span>
        </div>
        <div className="flex items-center justify-between h-[220px] mt-2">
          {/* Pie graphic */}
          <div className="relative w-1/2 aspect-square flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.trust_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {data.trust_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={trustColors[index % trustColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-black text-foreground leading-none">100,000</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider scale-90 mt-0.5">Candidates</span>
            </div>
          </div>
          {/* Legend */}
          <div className="w-1/2 space-y-2.5 pl-3">
            {data.trust_distribution.map((entry, index) => (
              <div key={entry.label} className="flex items-center justify-between text-[10px] font-bold">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: trustColors[index % trustColors.length] }}
                  />
                  <span className="text-muted-foreground truncate">{entry.label}</span>
                </div>
                <span className="text-foreground shrink-0 pl-1">{entry.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
