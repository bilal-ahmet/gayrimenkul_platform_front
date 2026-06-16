interface ProgressBarProps {
  percent: number
  showLabel?: boolean
}

export default function ProgressBar({ percent, showLabel = true }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>İnşaat ilerleme</span>
          <span className="font-medium text-emerald-700">%{clamped}</span>
        </div>
      )}
      <div className="h-1.5 bg-gray-200/70 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all bg-gradient-to-r from-emerald-700 to-amber-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
