import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="h-20 bg-white items-center flex justify-center border-b gap-1">
      <span className="text-cyan-600 font-extralight">powered by</span>

      <Link href="https://www.themoviedb.org/">
        <Image
          src="/tmdb-logo.svg"
          width={80}
          height={45}
          alt="TMDB"
          className="p-2"
        />
      </Link>
    </div>
  );
}
