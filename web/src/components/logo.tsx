import Image from "next/image";
import Link from "next/link";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src="/alice-logo.svg"
          alt="Alice Logo"
          height={35}
          width={100}
          priority={true}
        />
      </Link>
    </div>
  );
};
