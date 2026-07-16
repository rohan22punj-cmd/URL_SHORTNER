import { useState } from "react";

const API_URL = "/api/create";

function App() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);
    setShowSuccess(false);

    if (!fullUrl.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_url: fullUrl.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || data?.error || "Could not create short URL.");
      }

      const result = await response.text();
      setShortUrl(result);
      setShowSuccess(true);
      setFullUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async() => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      {showSuccess && shortUrl && (
        <div className="fixed left-4 right-4 top-4 z-10 mx-auto max-w-xl rounded-lg border border-emerald-400/40 bg-zinc-900 p-4 shadow-2xl shadow-black/40">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-300">
                Your shortened URL is ready.
              </p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-cyan-200 underline-offset-4 hover:underline"
              >
                {shortUrl}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="rounded-md border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Close
            </button>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 min-h-10 w-full rounded-md bg-emerald-400 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            {copied ? "Copied" : "Copy shortened URL"}
          </button>
        </div>
      )}

      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-cyan-300">
            URL Shortener
          </p>
          <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl">
            Shorten long links in one click.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Paste a long URL below and generate a clean short link using your backend API.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-2xl shadow-black/30 sm:p-5"
        >
          <label htmlFor="full-url" className="mb-2 block text-sm font-medium text-zinc-200">
            Enter your long URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="full-url"
              type="url"
              value={fullUrl}
              onChange={(event) => setFullUrl(event.target.value)}
              placeholder="https://example.com/very/long/link"
              className="min-h-12 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="min-h-12 rounded-md bg-cyan-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}
        </form>

        {shortUrl && (
          <div className="mt-5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-4">
            <p className="mb-2 text-sm font-medium text-cyan-200">Your short link</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="min-h-11 flex-1 overflow-hidden text-ellipsis rounded-md border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-cyan-200 underline-offset-4 hover:underline"
              >
                {shortUrl}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-11 rounded-md border border-zinc-700 px-4 text-sm font-medium text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
