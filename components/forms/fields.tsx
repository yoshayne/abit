import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClasses =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-purple-dark placeholder:text-brand-purple-dark/40 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple";

export function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-brand-purple-dark">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className={inputClasses} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={inputClasses} />;
}

export function Select(
  props: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }
) {
  return (
    <select {...props} className={inputClasses}>
      {props.children}
    </select>
  );
}

export function CheckboxField({
  id,
  name,
  required,
  error,
  children,
}: {
  id: string;
  name: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 text-sm text-brand-purple-dark">
        <input
          type="checkbox"
          id={id}
          name={name}
          required={required}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-brand-purple focus:ring-brand-purple"
        />
        <span>{children}</span>
      </label>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
