'use server';

import db from "@/lib/db";
import { getAuth } from "./get-user";


export const updateDiscordIdAction = async (discordId: string) => {
  try {
    const user = await getAuth();
    await db.user.update({
      where: { id: user.id },
      data: { discordId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

