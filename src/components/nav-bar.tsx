import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon } from "lucide-react";

async function Navbar() {
  const user = await currentUser();
  return (
    <header>
      <nav className="stick z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg ">
        <div className="max-width-wrapper">
          <div className="flex h-16 items-center justify-between">
            <Link href={"/"} className="flex z-40 font-semibold">
              Ping<span className="text-brand-700">Panda</span>
            </Link>
            <div className="h-full flex items-center space-x-4">
              {user ? (
                <>
                  <SignOutButton>
                    <Button size={"sm"} variant={"ghost"}>
                      Sign Out
                    </Button>
                  </SignOutButton>
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({
                      size: "sm",
                      className: "flex items-center gap-1 group",
                    })}
                  >
                    Dashboard
                    <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[2px] " />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"/pricing"}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Pricing
                  </Link>
                  <Link
                    href={"/sign-in"}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    sign in
                  </Link>
                  <div className="h-8 w-px bg-gray-200" />
                  <Link
                    href={"/sign-up"}
                    className={buttonVariants({
                      size: "sm",
                      variant: "default",
                      className: "flex items-center gap-1.5",
                    })}
                  >
                    sign up
                    <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[2px] " />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
