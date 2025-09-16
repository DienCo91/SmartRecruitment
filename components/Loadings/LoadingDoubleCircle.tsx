export function LoadingDoubleCircle() {
  return (
    <div className="bg-black/30 flex items-center justify-center h-screen w-screen">
      <div className="relative size-20 ">
        <div
          className="absolute inset-0 m-auto animate-spin rounded-full border-4
        border-white border-b-transparent border-t-transparent size-16 w-[80%] h-[80%]"
        />
        <div
          className="absolute inset-0 m-auto animate-spin -scale-x-100 rounded-full border-4
        border-white border-l-transparent border-r-transparent size-10 w-[50%] h-[50%]"
        />
      </div>
    </div>
  );
}
