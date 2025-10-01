import React from "react";
import { Check, Star } from "lucide-react";
import ShinyButton from "@/components/ui/shiny-button";
import { MockDiscordUI } from "@/components/landing/mock-discord-ui";
import { AnimatedList } from "@/components/ui/animated-list";
import { DiscordMessage } from "@/components/landing/dm-message";
import BenitoGrid from "@/components/landing/benito-grid";
import Image from "next/image";
import { Icons } from "@/components/landing/icons";

function Page() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <div className="max-width-wrapper text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <h1 className="main-heading">
                <span>Real Time SaaS Insight</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 bg-clip-text text-transparent">
                  Delivered to Your Discord
                </span>
              </h1>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              PingPanda is the easiest way to monitor your SaaS. Get instant
              notification for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              send directly to your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {[
                "Real-time Discord critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other events",
                "Monitor your SaaS",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-1.5 text-left">
                  <Check className="text-brand-700 size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </div>
      </section>
      {/* DISCORD ANIMATED UI */}
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <div className="max-width-wrapper relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda"
                    username="PingPanda"
                    timestamp="Today at 12:32AM"
                    badgeColor="#43b581"
                    badgeText="SingUp"
                    title="👤 New user singed up"
                    content={{
                      name: "Mohamed Salah",
                      email: "salahmohamed@example.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda"
                    username="PingPanda"
                    timestamp="Today at 12:32AM"
                    badgeColor="#faa61a"
                    badgeText="Revenue"
                    title="🤑 Payment received"
                    content={{
                      amount: "$4900",
                      email: "zoeow@example.com",
                      plan: "PRO",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda"
                    username="PingPanda"
                    timestamp="Today at 5:11AM"
                    badgeColor="#5868f2"
                    badgeText="Milestone"
                    title="🚀 Revenue Milestone achieved"
                    content={{
                      recurringRevenue: "$5.000 USD",
                      growth: "+8.25",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </div>
        </div>
      </section>
      {/* BENITO GRID */}
      <BenitoGrid />
      {/*  */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className=" max-width-wrapper flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Real-Word Experiences
            </h2>
            <h1 className="text-center main-heading">What our customers say</h1>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* FIRST Review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 justify-center mb-2 lg:justify-start">
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <Star
                      className="size-5 text-brand-600 fill-brand-600"
                      key={item}
                    />
                  );
                })}
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                Ping Panda has been a Game-changer for me. I've been using it
                for two months now and seeing sales pop in real-time is super
                satisfy.
              </p>
              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src={"/user-2.png"}
                  className="rounded-full object-cover"
                  alt="random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Friea Larson
                    <Icons.verificationBadge className="text-blue-500 size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@itsfriea</p>
                </div>
              </div>
            </div>
            {/* SECOND Review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 justify-center mb-2 lg:justify-start">
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <Star
                      className="size-5 text-brand-600 fill-brand-600"
                      key={item}
                    />
                  );
                })}
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                Ping Panda has been off four our SaaS. Nice to have simple way
                to see who we're doing day-to-day. Definitely makes our live
                easier.
              </p>
              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src={"/user-1.png"}
                  className="rounded-full object-cover"
                  alt="random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Kido Durands
                    <Icons.verificationBadge className="text-blue-500 size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@kidodurand_2</p>
                </div>
              </div>
            </div>
          </div>
          <ShinyButton
            href="/sing-up"
            className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Start for free today
          </ShinyButton>
        </div>
      </section>
    </>
  );
}

export default Page;
