import Image from "next/image";
import Link from "next/link";
//sencond way to do it, import it and thren use it you don't need to specify the dimensions on this case
import logo from "@public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* First option: with src */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* Second option: with importing the image */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={90}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
