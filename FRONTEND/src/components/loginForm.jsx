import { useState } from "react";
import { loginUser } from "../api/user.api";

function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            setIsLoading(true);
            const data = await loginUser(email.trim(), password);
            onSuccess(data.user);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                </label>
                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>

            <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                </label>
                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
            </div>

            {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="min-h-12 w-full rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {isLoading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}

export default LoginForm;
