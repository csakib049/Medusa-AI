const LoadingDots = () => (
  <span className="inline-flex gap-1.5">
    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:0ms]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:150ms]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:300ms]" />
  </span>
)

const Skeleton = () => {
  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeInUp">
      <div className="flex flex-col items-center justify-center gap-5 py-10">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-gray-700 flex items-center justify-center animate-pulseGlow">
            <svg
              className="w-10 h-10 animate-spin-slow"
              style={{ color: 'var(--color-accent)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div
            className="absolute -inset-2 rounded-full opacity-40 animate-ping"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>

        <div className="text-center">
          <p className="text-gray-200 text-base font-semibold flex items-center gap-2">
            Analyzing your code
            <LoadingDots />
          </p>
          <p className="text-gray-500 text-xs mt-1.5">
            Generating explanation
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-4 rounded-full animate-pulse-scale" style={{ backgroundColor: 'var(--color-accent)' }} />
          <div className="h-4 rounded-full animate-pulse-scale" style={{ width: '120px', backgroundColor: 'var(--color-accent)', opacity: 0.4 }} />
        </div>
        {[95, 85, 90, 70, 80, 60, 75, 50].map((width, i) => (
          <div
            key={i}
            className="h-3.5 rounded animate-shimmer"
            style={{
              width: `${width}%`,
              animationDelay: `${i * 120}ms`,
              background: `linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)`,
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Skeleton
