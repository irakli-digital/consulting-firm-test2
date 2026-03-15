interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
      <svg className="mb-4 h-8 w-8 text-teal/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4V21H0z" />
      </svg>
      <p className="text-slate-600 leading-relaxed">{quote}</p>
      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="font-semibold text-navy">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
