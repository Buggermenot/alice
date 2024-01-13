"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Client, useHydrated } from "react-hydration-provider";

import { Wrapper, Logo } from "@/components";
import { Button } from "@/components/ui/forms";
import { Skeleton } from "@/components/ui/skeleton";
import { useQID } from "@/hooks/use-qid";
import { HeaderProfileDropdown } from "@/module/header/header-profile-dropdown";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { qid } = useQID();
  const router = useRouter();
  const hydrated = useHydrated();

  return (
    <Wrapper className={`my-8 flex justify-between items-center`}>
      <div>
        <Logo />
      </div>
      <div>
        {hydrated ? (
          <Client>
            {!qid ? (
              <Button asChild={true}>
                <Link href={"/login"}>Login</Link>
              </Button>
            ) : (
              <HeaderProfileDropdown />
            )}
          </Client>
        ) : (
          <Skeleton className="w-[80px] h-[36px] rounded-md" />
        )}
      </div>
    </Wrapper>
  );
};
