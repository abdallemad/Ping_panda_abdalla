import DashboardPage from "@/components/dashboard/dashboard-page";
import React from "react";
import DashboardPageContent from "./dashboard-content";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getAuth } from "@/actions/get-user";
import CreateEventCategoryModel from "@/components/dashboard/create-event-category-model";
import { Metadata } from "next";
import { createCheckoutSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { PaymentSuccessModal } from "@/components/payment-success-modal";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};
interface DashboardProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
async function page({ searchParams }: DashboardProps) {
  const user = await getAuth();
  const intent = searchParams?.intent || "";
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });
    return redirect(session.url!);
  }
  const success = searchParams?.success || false;
  return (
    <>
      {success && <PaymentSuccessModal />}
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
    </>
  );
}

export default page;
