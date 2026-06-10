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
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
        selected
          ? 'bg-emerald-700 text-white border-emerald-700'
          : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400 hover:text-emerald-700'
      }`}
    >
      {label}
    </button>
  )
}
