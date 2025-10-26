import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return new Response("Invalid signature.", { status: 400 });

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const { userId } = session.metadata || { userId: "" };
      if (!userId) return new Response("No user id found", { status: 400 });

      await db.user.update({
        where: { id: userId },
        data: { plan: "PRO" },
      });
      return new Response("Success", { status: 201 });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
