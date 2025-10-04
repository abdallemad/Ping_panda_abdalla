import DashboardPage from "@/components/dashboard/dashboard-page";
import React from "react";
import DashboardPageContent from "./dashboard-content";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getAuth } from "@/actions/get-user";
import CreateEventCategoryModel from "@/components/dashboard/create-event-category-model";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
}
async function page() {
  await getAuth();
  return (
    <DashboardPage
      cta={
        <CreateEventCategoryModel>
          <Button className="w-full">
            <PlusIcon className="size-4 mr-2" />
            Add Category
          </Button>
        </CreateEventCategoryModel>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardPage>
  );
}

export default page;
