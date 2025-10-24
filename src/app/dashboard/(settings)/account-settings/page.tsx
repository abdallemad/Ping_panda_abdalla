import DashboardPage from "@/components/dashboard/dashboard-page";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsPageContent from "./settings-page-content";

async function Page() {
  const auth = await currentUser();
  if (!auth) return redirect("/sign-in");
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });
  if (!user) redirect("/sing-in");
  return (
    <DashboardPage title="Account Settings">
      <SettingsPageContent discordId={user.discordId || ""} />
    </DashboardPage>
  );
}

export default Page;
