import { type ButtonHTMLAttributes } from 'react';
interface P extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'default' | 'outline' | 'ghost' | 'destructive'; size?: 'default' | 'sm' | 'lg'; }
export function Button({ variant = 'default', size = 'default', className = '', children, ...props }: P) {
const base = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50';
const v: Record<string, string> = { default: 'bg-blue-600 text-white hover:bg-blue-700', outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700', ghost: 'hover:bg-slate-100 text-slate-700', destructive: 'bg-red-600 text-white hover:bg-red-700' };
const s: Record<string, string> = { default: 'h-10 px-4 py-2', sm: 'h-9 px-3 text-xs', lg: 'h-11 px-8' };
return <button className={`${base} ${v[variant]} ${s[size]} ${className}`} {...props}>{children}</button>;
}