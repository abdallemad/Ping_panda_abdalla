import { getAuth } from "@/actions/get-user";
import DashboardPage from "@/components/dashboard/dashboard-page";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import CategoryContent from "./category-content";

async function Page({ params }: { params: Promise<{ name: string }> }) {
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
    <DashboardPage
      title={`${category.emoji} ${category.name} Events`}
    >
      <CategoryContent hasEvents={hasEvents} category={category}/>
    </DashboardPage>
  );
}

export default Page;
