import { getAuth } from "@/actions/get-user";
import DashboardPage from "@/components/dashboard/dashboard-page";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import CategoryContent from "./category-content";
import { Metadata } from "next";
type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  const user = await getAuth();
  const category = await db.eventCategory.findUnique({
    where: { name_userId: { name: name, userId: user.id } },
  });
  // نص الإيموجي جوه SVG صغير
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="120" width="120">
      <text y="0.9em" font-size="90">${category?.emoji || "📊"}</text>
    </svg>
  `;

  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return {
    title: `Dashboard - ${category?.name || "Unknown Category"} Events`,
    description: `Manage your ${
      category?.name || "Unknown Category"
    } events and view analytics on your dashboard.`,
    icons: {
      icon: svgDataUrl,
    },
  };
}

async function Page({ params }: Props) {
  const { name } = await params;
  if (!name || typeof name !== "string") return notFound();
  const user = await getAuth();
  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: name,
        userId: user.id,
      },
    },
    include: { _count: { select: { events: true } } },
  });
  if (!category) return notFound();
  const hasEvents = category._count.events > 0;
  return (
    <DashboardPage title={`${category.emoji} ${category.name} Events`}>
      <CategoryContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  );
}

export default Page;
