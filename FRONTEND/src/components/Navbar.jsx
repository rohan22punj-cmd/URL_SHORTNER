import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/user.api";
import { clearUser } from "../store/authSlice";

function Navbar() {
  const { user, isCheckingSession } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      dispatch(clearUser());
      navigate({ to: "/" });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex min-h-18 max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Main navigation">
        <Link to="/" className="text-2xl font-black tracking-tight text-blue-600 sm:text-3xl">Shortly</Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" activeProps={{ className: "text-blue-700" }} className="hidden text-sm font-semibold text-slate-500 transition hover:text-blue-700 sm:block">Home</Link>
          {user && <Link to="/dashboard" activeProps={{ className: "text-blue-700" }} className="text-sm font-semibold text-slate-500 transition hover:text-blue-700">Dashboard</Link>}
          {!isCheckingSession && (user ? (
            <>
              <span className="hidden max-w-28 truncate text-sm font-medium text-slate-500 md:block">Hi, {user.name}</span>
              <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="min-h-10 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed">
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </button>
            </>
          ) : (
            <Link to="/auth" className="min-h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Log in</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
