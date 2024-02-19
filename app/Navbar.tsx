import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-16 bg-white items-center flex justify-center border-b border-primary shadow-md">
      <Link href="/">
        <Image
          src="/sixides-logo.png"
          width={180}
          height={45}
          alt="Sixides movies"
          className="p-2"
        />
      </Link>
    </nav>
  );
}
