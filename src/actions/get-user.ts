"use server";
import db from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export async function getAuth() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const dbUser = await db.user.findUnique({
    where: {
      externalId: user.id,
    },
  });
  if (!dbUser) return redirect("/sign-in");
  return dbUser;
}
