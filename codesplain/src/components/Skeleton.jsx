const Skeleton = () => {
  const lines = [
    { width: '40%', height: 'h-4' },
    { width: '100%', height: 'h-3' },
    { width: '85%', height: 'h-3' },
    { width: '90%', height: 'h-3' },
    { width: '60%', height: 'h-3' },
  ]

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-2xl animate-fadeInUp">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-5 rounded-full bg-gray-800 animate-shimmer" />
        <div className="w-32 h-4 rounded bg-gray-800 animate-shimmer" />
      </div>

      {lines.map((line, i) => (
        <div key={i} className={`${line.height} rounded bg-gray-800 animate-shimmer mb-3`} style={{ width: line.width }} />
      ))}

      <div className="mt-5 p-4 rounded-lg bg-gray-850 border border-gray-750">
        <div className="h-3 rounded bg-gray-800 animate-shimmer mb-2" style={{ width: '70%' }} />
        <div className="h-3 rounded bg-gray-800 animate-shimmer mb-2" style={{ width: '55%' }} />
        <div className="h-3 rounded bg-gray-800 animate-shimmer mb-2" style={{ width: '80%' }} />
        <div className="h-3 rounded bg-gray-800 animate-shimmer" style={{ width: '45%' }} />
      </div>
    </div>
  )
}

export default Skeleton
