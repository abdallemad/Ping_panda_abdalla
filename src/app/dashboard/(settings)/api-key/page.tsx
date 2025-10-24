import DashboardPage from "@/components/dashboard/dashboard-page";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ApiKeySettings from "./api-key-settings";

async function Page() {
  const auth = await currentUser();
  if (!auth) return redirect("/sign-in");
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });
  if (!user) redirect("/sign-in");
  return (
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey || ""} />
    </DashboardPage>
  );
}

export default Page;
