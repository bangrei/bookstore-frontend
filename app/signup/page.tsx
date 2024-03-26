"use client";

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
	const [loading, registerAccount] = useMainStore((state) => [
    state.loading,
    state.registerAccount,
	]);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const _login = () => {
    router.push("/login");
	};
	const _goBack = () => {
    router.back();
	};
	const _signUp = async () => {
		const firstname = firstnameRef.current!.value;
		const lastname = lastnameRef.current!.value;
		const email = emailRef.current!.value;
		const password = passwordRef.current!.value;
		if (!firstname || !lastname || !email || !password) return;
		const res:any = await registerAccount(firstname, lastname, email, password);
		if (res && res.success) {
			_showAlert("Congratulations. You get 100 points", "Welcome");
			return router.push('/');
		}
		_showAlert(`Something went wrong! ${res.message}`, "Error");
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
          <label htmlFor="firstname" className="w-full text-sm">
            First Name
          </label>
          <input
            type="text" ref={firstnameRef}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-1">
          <label htmlFor="lastname" className="w-full text-sm">
            Last Name
          </label>
          <input
            type="text" ref={lastnameRef}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-1">
          <label htmlFor="email" className="w-full text-sm">
            Email Address
          </label>
          <input
            type="email" ref={emailRef}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-1">
          <label htmlFor="password" className="w-full text-sm">
            Password
          </label>
          <input
            type="password" ref={passwordRef}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md border-slate-200 outline-none focus:border-primary text-md font-normal"
          />
        </div>
        <div onClick={()=>_signUp()} className="w-full flex flex-col items-center gap-1 border bg-secondary rounded-lg p-4 cursor-pointer hover:opacity-70">
          <span className="text-white">Create Account</span>
        </div>
        <div className="w-full flex items-center justify-center gap-2 p-4">
          <span className="text-slate-500 text-xs">Already have account?</span>
          <span
            onClick={() => _login()}
            className="text-secondary text-xs cursor-pointer hover:opacity-75 font-bold"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
