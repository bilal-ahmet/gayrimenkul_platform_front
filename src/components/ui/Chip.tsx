"use client";

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium tracking-wide transition-colors border ${
        selected
          ? 'bg-emerald-700 text-amber-50 border-emerald-700 ring-1 ring-amber-400/30'
          : 'bg-white text-gray-600 border-gray-300 hover:border-amber-400 hover:text-emerald-800'
      }`}
    >
      {label}
    </button>
  )
}
