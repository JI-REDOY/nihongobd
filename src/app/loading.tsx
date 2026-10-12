export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-10 h-10 rounded-lg bg-jp-red text-white flex items-center justify-center text-xl font-bold animate-pulse">
            日
          </span>
          <span className="text-xl font-bold">
            Nihongo<span className="text-jp-red">BD</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          <span className="w-2 h-2 rounded-full bg-jp-red animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-jp-red animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-jp-red animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}