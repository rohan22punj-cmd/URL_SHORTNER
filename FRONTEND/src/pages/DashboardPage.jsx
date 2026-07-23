import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { createShortUrl, getShortUrlHistory } from "../api/shortUrlApiu";

function DashboardPage() {
  const { user, isCheckingSession } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (!isCheckingSession && !user) navigate({ to: "/auth" });
  }, [user, isCheckingSession, navigate]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;
      setHistoryLoading(true);
      try {
        const urls = await getShortUrlHistory();
        setHistory(urls);
      } catch {
        setHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    loadHistory();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);
    if (!fullUrl.trim()) return setError("Please enter a URL to shorten.");

    try {
      setIsLoading(true);
      const data = await createShortUrl(fullUrl.trim());
      setShortUrl(data.short_url);
      setFullUrl("");
      setHistory((prev) => [{ id: Date.now(), full_url: fullUrl.trim(), short_url: data.short_url, clicks: 0, createdAt: new Date().toISOString() }, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not create short URL.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  if (isCheckingSession || !user) return <div className="grid min-h-[calc(100vh-73px)] place-items-center text-sm font-medium text-slate-500">Loading your dashboard...</div>;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Your dashboard</p><h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Paste the URL to be shortened</h1><p className="mt-4 text-slate-500">Create a clean, easy-to-share link in seconds.</p></div>
      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-xl shadow-slate-200/70 sm:px-10 sm:py-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl"><label htmlFor="full-url" className="sr-only">Enter your long URL</label><div className="flex flex-col overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 sm:flex-row"><input id="full-url" type="url" value={fullUrl} onChange={(event) => setFullUrl(event.target.value)} placeholder="Enter the link here" className="min-h-16 flex-1 px-5 text-base outline-none placeholder:text-slate-400" /><button type="submit" disabled={isLoading} className="min-h-16 bg-blue-600 px-8 text-base font-bold text-white transition hover:bg-blue-700 disabled:bg-slate-400">{isLoading ? "Shortening..." : "Shorten URL"}</button></div>{error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}</form>
        {shortUrl && <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center"><a href={shortUrl} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-semibold text-blue-700 hover:underline">{shortUrl}</a><button type="button" onClick={handleCopy} className="min-h-11 rounded-lg bg-emerald-600 px-5 text-sm font-bold text-white">{copied ? "Copied!" : "Copy link"}</button></div>}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-xl shadow-slate-200/70 sm:px-10 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Your link history</h2>
            <p className="mt-2 text-sm text-slate-500">All links you created appear here in reverse chronological order.</p>
          </div>
        </div>

        {historyLoading ? (
          <p className="text-sm text-slate-500">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-slate-500">No short URLs created yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{item.short_url}</p>
                    <p className="mt-1 truncate text-sm text-slate-600">Original: {item.full_url}</p>
                  </div>
                  <p className="text-sm text-slate-500">Clicks: {item.clicks}</p>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">Created: {new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default DashboardPage;
