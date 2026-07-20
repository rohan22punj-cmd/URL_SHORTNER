import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { setSessionChecked, setUser } from "./store/authSlice";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        dispatch(setUser(currentUser ?? null));
      } catch {
        dispatch(setUser(null));
      } finally {
        dispatch(setSessionChecked());
      }
    };
    loadSession();
  }, [dispatch]);

  return <main className="min-h-screen bg-slate-50 text-slate-800"><Navbar /><Outlet /></main>;
}

export default App;
