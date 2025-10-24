import { updateDiscordIdAction } from "@/actions/update-discord";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";


function useUpdateDiscordId(initialDiscordId:string) {
  const [discordId, setDiscordId] = useState(initialDiscordId);

  const { mutate: updateDiscordId, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      return await updateDiscordIdAction(discordId);
    },
    onSuccess: ({ success }) => {
      if (success) {
        toast( "Discord Id updated successfully");
      } else {
        toast( "Failed to update discord id");
      }
    },
  });
  return {
    setDiscordId,
    updateDiscordId,
    isPending
  }
}

export default useUpdateDiscordId;
