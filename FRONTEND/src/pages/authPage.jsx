import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import { setUser } from "../store/authSlice";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const { user, isCheckingSession } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingSession && user) navigate({ to: "/dashboard" });
  }, [user, isCheckingSession, navigate]);

  const handleAuthenticated = (currentUser) => {
    dispatch(setUser(currentUser));
    navigate({ to: "/dashboard" });
  };

  if (isCheckingSession) return <div className="grid min-h-[calc(100vh-73px)] place-items-center text-sm font-medium text-slate-500">Checking session...</div>;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Shortly account</p><h1 className="mt-3 text-2xl font-extrabold tracking-tight">{mode === "login" ? "Welcome back" : "Create your account"}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{mode === "login" ? "Sign in to manage and shorten your links." : "Join Shortly and make every link easier to share."}</p></div><div className="my-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">{[["login", "Log in"], ["register", "Create account"]].map(([value, label]) => <button key={value} type="button" onClick={() => setMode(value)} className={`min-h-10 rounded-lg text-sm font-bold transition ${mode === value ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>{label}</button>)}</div>{mode === "login" ? <LoginForm onSuccess={handleAuthenticated} /> : <RegisterForm onSuccess={handleAuthenticated} />}</div>
    </section>
  );
}

export default AuthPage;
