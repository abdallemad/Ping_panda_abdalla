"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateDiscordId from "@/hooks/use-update-discordId";
import Link from "next/link";
import React from "react";

function SettingsPageContent({ discordId }: { discordId: string }) {

  const {isPending,setDiscordId,updateDiscordId, _discordId} = useUpdateDiscordId(discordId)

  return (
    <Card className="max-w-xl w-full space-y-4">
      <div>
        <Label>Discord Id</Label>
        <Input
          value={_discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          className="mt-1"
          placeholder="Enter your discord id"
        />
      </div>
      <p className="mt-2 text-sm/6 text-gray-600">
        Don't know how to find your discord id?{""}
        <Link
          href="https://www.youtube.com/watch?v=2eP6CFFpZ3E"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:text-brand-500"
        >
          Learn how Obtain Discord Id.
        </Link>
      </p>
      <div className="pt-4">
        <Button
          onClick={() => updateDiscordId(discordId)}
          className=""
          disabled={!discordId}
        >
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </Card>
  );
}

export default SettingsPageContent;
