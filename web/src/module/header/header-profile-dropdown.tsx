import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/forms";
import { useQID } from "@/hooks/use-qid";
import { useUser } from "@/hooks/use-user";

interface HeaderProfileDropdownProps {}

export const HeaderProfileDropdown: React.FC<
  HeaderProfileDropdownProps
> = ({}) => {
  const user = useUser();
  const { removeQID } = useQID();
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {user?.username
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`text-destructive hover:bg-destructive hover:text-destructive-foreground font-semibold`}
          onClick={() => {
            removeQID();

            queryClient.removeQueries({ queryKey: ["user"], exact: true });
            queryClient.removeQueries({ queryKey: ["me"], exact: true });

            router.push("/");
            location.reload();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
