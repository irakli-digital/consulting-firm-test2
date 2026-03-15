interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string[];
  children?: React.ReactNode;
}

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors placeholder:text-slate-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      )}
      {error && error.length > 0 && (
        <p className="mt-1 text-sm text-red-500">{error[0]}</p>
      )}
    </div>
  );
}
