import React from 'react';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
export function Button({ variant = 'default', size = 'default', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants: Record<string, string> = { default: 'bg-blue-600 text-white hover:bg-blue-700', outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700', ghost: 'hover:bg-slate-100 text-slate-700', destructive: 'bg-red-600 text-white hover:bg-red-700' };
  const sizes: Record<string, string> = { default: 'h-10 px-4 py-2', sm: 'h-9 px-3 text-xs', lg: 'h-11 px-8', icon: 'h-10 w-10' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

// Input Component
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className = '', ...props }, ref) => (
  <input ref={ref} className={`flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${className}`} {...props} />
));
Input.displayName = 'Input';

// Label Component
export function Label({ className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />;
}

// Card Components
export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...props} />; }
export function CardHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />; }
export function CardTitle({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={`text-lg font-semibold leading-none tracking-tight text-slate-900 ${className}`} {...props} />; }
export function CardDescription({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={`text-sm text-slate-500 ${className}`} {...props} />; }
export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={`p-6 pt-0 ${className}`} {...props} />; }
export function CardFooter({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />; }

// Select Component (Native HTML for maximum compatibility)
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { onValueChange?: (v: string) => void; }
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className = '', onValueChange, onChange, children, ...props }, ref) => (
  <select ref={ref} className={`flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`} onChange={e => { onChange?.(e); onValueChange?.(e.target.value); }} {...props}>{children}</select>
));
Select.displayName = 'Select';

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) { return <option value={value}>{children}</option>; }

// Textarea Component
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className = '', ...props }, ref) => (
  <textarea ref={ref} className={`flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`} {...props} />
));
Textarea.displayName = 'Textarea';