"use client"
import { useMainStore } from "@/store/MainStore";
import { useAlertStore } from "@/store/alertStore";
import { useRouter } from "next/navigation";

export default function Home() {
	const [showAlert, setAlertTitle, setAlertMessage, openAlert] = useAlertStore(
    (state) => [
      state.showAlert,
      state.setAlertTitle,
      state.setAlertMessage,
      state.openAlert,
    ]
  );
	const [cart, customer, loading, goCheckout, removeCart] = useMainStore((state) => [
		state.cart,
		state.customer,
		state.loading,
		state.goCheckout,
		state.removeCart,
	]);
	const router = useRouter();
	const getTotal = () => {
		let total = 0;
		if (cart && cart.items.length > 0) {
			cart.items.forEach((item: CartItem) => {
				total += item.book.point;
			})
		}
		return total;
	}
	const _showAlert = (message:string, title:string) => {
		openAlert();
		setAlertTitle(title);
		setAlertMessage(message);
	}
	const back = () => {
		router.back();
	}
	const removeItem = (cart: CartItem) => {
		removeCart(cart.book);
	}
	const _goCheckout = async () => {
		try {
			if (!cart) return;
			if (loading) return;
			if(!customer) return router.push('/login')
			const res:any = await goCheckout(cart!);
			console.log(res);
			if (res && res.success) {
				_showAlert("Your order successfully submitted!", "Success");
				return router.push('/order');
			}
			_showAlert(`Something went wrong! ${res.message}`, "[FAILED]");
		} catch (err) {
			console.log(err);
			_showAlert(`Something went wrong ${err}`, "Error");
		}
	}
  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-[600px] mx-auto pt-24 text-slate-800">
      <h1 className="text-xl font-bold">Cart</h1>
      <div className="w-full flex flex-col border border-slate-200 rounded-md p-4">
        {cart &&
          cart.items!.length &&
          cart.items.map((item: CartItem, i) => {
            return (
              <div key={i} className="border-b py-2 flex justify-between">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">{item.book.title}</div>
                  <div className="text-slate-500 font-normal text-sm">
                    {item.book.writer}
                  </div>
                  <div className="text-slate-600 font-bold text-sm">
                    {item.qty}x
                  </div>
                </div>
                <div className="flex items-center justify-center cursor-pointer hover:opacity-70">
                  <span
                    onClick={() => removeItem(item)}
                    className="text-xs text-secondary"
                  >
                    Remove
                  </span>
                </div>
              </div>
            );
          })}
        <div className="border-b py-4 flex justify-between">
          <span>Total</span>
          <span className="font-bold">${getTotal()}</span>
        </div>
        {customer && (
          <div className="border-b py-4 flex justify-between">
            <span>Your Points</span>
            <span className="font-bold">${customer?.points}</span>
          </div>
        )}
        <div className="flex justify-between gap-4 py-8">
          <span
            onClick={() => back()}
            className="border border-secondary text-secondary py-2 px-8 rounded-md cursor-pointer"
          >
            Back
          </span>
          {cart && cart.items.length > 0 && (
            <span
              onClick={() => _goCheckout()}
              className="border border-primary text-primary py-2 px-8 rounded-md cursor-pointer"
            >
              {loading ? "Please wait..." : "Checkout"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
