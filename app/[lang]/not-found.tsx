import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy">404</h1>
        <p className="mt-4 text-xl text-slate-600">Page not found</p>
        <p className="mt-2 text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-teal/50 focus:ring-offset-2 motion-reduce:transition-none"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
