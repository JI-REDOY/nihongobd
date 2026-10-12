import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
      aria-label="NihongoBD Home"
    >
      <span className="w-9 h-9 rounded-lg bg-jp-red text-white flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
        日
      </span>
      <span className="text-lg font-bold text-text-primary">
        Nihongo<span className="text-jp-red">BD</span>
      </span>
    </Link>
  );
}