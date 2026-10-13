import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
      aria-label="NihongoBD Home"
    >
      {/* Main Logo Image */}
      <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white group-hover:scale-105 transition-transform shrink-0">
        <Image
          src="/logo.png"
          alt="NihongoBD"
          width={36}
          height={36}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Brand name */}
      <span className="text-lg font-bold text-text-primary whitespace-nowrap">
        Nihongo<span className="text-jp-red">BD</span>
      </span>
    </Link>
  );
}