import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-soft animate-pulse">
            <Image
              src="/logo.png"
              alt="NihongoBD"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold">
            Nihongo<span className="text-jp-red">BD</span>
          </span>
        </div>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-1 mt-4">
          <span
            className="w-2 h-2 rounded-full bg-jp-red animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-jp-red animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-jp-red animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}