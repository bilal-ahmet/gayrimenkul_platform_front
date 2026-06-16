import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary:   'bg-emerald-700 hover:bg-emerald-800 text-amber-50 ring-1 ring-amber-400/20',
  secondary: 'border border-emerald-700/40 text-emerald-800 hover:bg-emerald-50',
  ghost:     'text-gray-600 hover:bg-gray-100',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-full',
  md: 'px-5 py-2.5 text-sm rounded-full',
  lg: 'px-7 py-3 text-sm rounded-full',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-semibold tracking-wide transition-colors disabled:opacity-50 ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
