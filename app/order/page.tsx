import Board from "../components/Board";
import OrderCollection from "../components/OrderCollection";
import ScrollTopButton from "../components/ScrollTopButton";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-4 text-slate-600 p-4">
      <div className="w-full flex flex-col flex-2 gap-2">
        <span className="font-bold text-3xl">My Orders</span>
      </div>
      <OrderCollection />
      <ScrollTopButton />
    </div>
  );
}
