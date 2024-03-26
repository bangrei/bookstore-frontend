"use client";

import { useMainStore } from "@/store/MainStore";
import { useAlertStore } from "@/store/alertStore";
import React from "react";

interface OrderProps {
  order: Order;
  innerRef?: (node?: Element | null | undefined) => void;
}

const OrderCard: React.FC<OrderProps> = ({ order, innerRef }) => {
	const [showAlert, setAlertTitle, setAlertMessage, openAlert] = useAlertStore(
    (state) => [
      state.showAlert,
      state.setAlertTitle,
      state.setAlertMessage,
      state.openAlert,
    ]
	);
	const _showAlert = (message: string, title: string) => {
    openAlert();
    setAlertTitle(title);
    setAlertMessage(message);
  };
	const [cancelMyOrder] = useMainStore((state) => [state.cancelMyOrder]);
  const currency = (value: any) => {
    if (value != null) {
      value = value.toFixed(2);
      let curr = "";
      let positiveValue = value.toString().split(".")[0];
      let decimalValue =
        value.toString().split(".").length > 1
          ? value.toString().split(".")[1]
          : "00";
      let currRev = positiveValue.toString().split("").reverse().join("");
      for (let i = 0; i < currRev.length; i++) {
        if (i % 3 == 0) {
          curr += currRev.substr(i, 3) + ",";
        }
      }

      let totalString = curr
        .split("", curr.length - 1)
        .reverse()
        .join("");
      return `${totalString} ${decimalValue > 0 ? "." + decimalValue : ""}`;
    }
	};
	console.log(order.items);
	const _cancel = async () => {
		const res: any = await cancelMyOrder(order.id);
		let message = 'Order is cancelled';
		if (!res.success) message = `Something went wrong! ${res.message}`;
		_showAlert(message, "Alert");
	}
  return (
    <React.Fragment>
      <div className="w-full flex flex-col relative gap-4 border-b py-2" ref={innerRef}>
        <div className="py-2 flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-bold">Order #{order.id}</div>
            <div className="text-slate-500 font-normal text-sm">
              Status: {order.canceled ? "Cancelled" : "Completed"}
            </div>
            <div className="text-slate-600 font-bold text-sm">{order.qty}x</div>
          </div>
          <div className="flex flex-col items-end justify-end gap-2">
            <span className="text-lg text-primary">
              ${currency(order.total)}
            </span>
            {!order.canceled && (
              <div
                onClick={() => _cancel()}
                className="text-xs text-secondary cursor-pointer hover:opacity-70 border border-secondary py-2 px-4 rounded-lg"
              >
                Cancel
              </div>
            )}
          </div>
        </div>
        {order.items && (
          <div className="flex w-full flex-col gap-2 pt-2">
            {order.items.map((item: OrderItem) => {
              return (
                <div key={item.id} className="flex w-full justify-between">
                  <div className="flex gap-4 items-center">
                    <span className="text-sm">{item.qty}x</span>
                    <div className="text-sm font-bold flex flex-col">
                      <span>{item.book ? item.book.title : "unknown"}</span>
                      <span className="text-xs text-slate-400">
                        {item.book ? item.book.writer : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500">${item.point}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderCard;
