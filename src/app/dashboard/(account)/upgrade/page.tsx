import DashboardPage from "@/components/dashboard/dashboard-page";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import UpgradePageContent from "./upgrade-page-content";

async function Upgrade() {
  const auth = await currentUser();
  if (!auth) return redirect("/sign-in");
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });
  if (!user) redirect("/sign-in");
  return (
    <DashboardPage title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardPage>
  );
}

export default Upgrade;
