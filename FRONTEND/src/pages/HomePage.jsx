import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-blue-600">A simpler way to share</p>
      <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">Long links made short, clean, and ready to share.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">Shortly turns unwieldy URLs into simple links you can send anywhere.</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to={user ? "/dashboard" : "/auth"} className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">{user ? "Open dashboard" : "Get started free"}</Link>
        <Link to="/auth" className="min-h-12 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Sign in</Link>
      </div>
      <div className="mt-14 grid gap-5 text-left md:grid-cols-3">{[["Quick", "Create a short link in seconds."], ["Secure", "Your links are connected to your account."], ["Shareable", "Perfect for messages, posts, and emails."]].map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 grid size-10 place-items-center rounded-lg bg-blue-100 font-black text-blue-600">✓</div><h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></article>)}</div>
    </section>
  );
}

export default HomePage;
