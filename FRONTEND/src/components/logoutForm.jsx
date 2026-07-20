import { useState } from "react";
import { logoutUser } from "../api/user.api";

function LogoutForm({ user, onLogout }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logoutUser();
            onLogout();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="max-w-32 truncate text-sm font-semibold text-slate-700">{user?.name || user?.email}</p>
            </div>
            <button type="button" onClick={handleLogout} disabled={isLoading} className="min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400">
                {isLoading ? "Signing out..." : "Sign out"}
            </button>
        </div>
    );
}

export default LogoutForm;
