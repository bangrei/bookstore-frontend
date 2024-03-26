"use client"

import { useRouter } from "next/navigation";
import { useMainStore } from "@/store/MainStore";
import { useRef } from "react";
import { useAlertStore } from "@/store/alertStore";

export default function Home() {
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
	const [loading, loginAccount] = useMainStore((state) => [
    state.loading,
    state.loginAccount,
  ]);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const _signUp = () => {
		router.push('/signup');
	}
	const _login = async () => {
		if (loading) return;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (!email || !password) return;
    const res: any = await loginAccount(
      email,
      password
    );
    if (res && res.success) {
      return router.push("/");
		}
		_showAlert(`Something went wrong! ${res.message}`, "Error");
  };
	const _goBack = () => {
		router.back()
	}
  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-[500px] mx-auto pt-24 text-slate-900">
      <span
        className="text-primary cursor-pointer hover:opacity-75 w-fit"
        onClick={() => _goBack()}
      >
        Go Back
      </span>
      <div className="w-full flex flex-col border border-slate-200 rounded-md p-4 gap-4">
        <div className="w-full flex flex-col items-center gap-1">
          <label htmlFor="email" className="w-full text-sm">
            Email Address
          </label>
          <input
            type="email"
            ref={emailRef}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-1">
          <label htmlFor="password" className="w-full text-sm">
            Password
          </label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div
          onClick={() => _login()}
          className="w-full flex flex-col items-center gap-1 border bg-secondary rounded-lg p-[12px] cursor-pointer hover:opacity-70"
        >
          <span className="text-white">
            {loading ? "Please wait..." : "Login"}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-2 p-4">
          <span className="text-slate-500 text-xs">Don't have account?</span>
          <span
            onClick={() => _signUp()}
            className="text-secondary text-xs cursor-pointer hover:opacity-75 font-bold"
          >
            Create account
          </span>
        </div>
      </div>
    </div>
  );
}
