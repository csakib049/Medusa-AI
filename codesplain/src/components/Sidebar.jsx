import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

const Sidebar = ({ history, activeId, onSelect, onNewChat, onDelete }) => {
  const { theme, cycleTheme } = useTheme()

  const themeLabels = { green: 'Green', purple: 'Purple', red: 'Red' }
  const themeIcons = {
    green: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    purple: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    red: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  }

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-black/60 backdrop-blur-xl border-r border-gray-800 flex flex-col z-10">
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/60 hover:text-white transition-all duration-200 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {history.length === 0 && (
          <p className="text-gray-600 text-sm text-center mt-8">No history yet</p>
        )}
        {history.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center gap-1 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
              activeId === item.id
                ? 'bg-gray-800/80 text-white border border-gray-700'
                : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200 border border-transparent'
            }`}
          >
            <div
              className="flex items-center gap-2 flex-1 min-w-0"
              onClick={() => onSelect(item.id)}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="truncate">{item.title}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
              className="flex-shrink-0 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-900/50 hover:text-red-400 text-gray-600 transition-all duration-200"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-800 flex items-center justify-between">
        <button
          onClick={cycleTheme}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
          title={`Theme: ${themeLabels[theme]}`}
        >
          {themeIcons[theme]}
          <span>{themeLabels[theme]}</span>
        </button>
        <span className="text-xs text-gray-600">Medusa AI</span>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  history: PropTypes.array.isRequired,
  activeId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  onNewChat: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Sidebar