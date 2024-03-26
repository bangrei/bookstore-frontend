import Board from "./components/Board";
import ScrollTopButton from "./components/ScrollTopButton";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-4 text-slate-600">
      <Board />
      <ScrollTopButton />
    </div>
  );
}
