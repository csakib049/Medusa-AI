import { useState } from 'react'
import PropTypes from 'prop-types'
import SettingsModal from './SettingsModal'

const exportHistory = (history) => {
  if (history.length === 0) return

  const md = history.map((item, i) => {
    const date = new Date(item.id).toLocaleString()
    return `# ${i + 1}. ${item.title}\n\n**Language:** ${item.language}\n**Date:** ${date}\n\n## Code\n\`\`\`${item.language}\n${item.code}\n\`\`\`\n\n## Explanation\n\n${item.explanation}\n\n---\n`
  }).join('\n')

  const blob = new Blob([md], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `medusa-history-${Date.now()}.md`
  a.click()
  URL.revokeObjectURL(url)
}

const Sidebar = ({ history, activeId, onSelect, onNewChat, onDelete, onClearAll, open, onToggle }) => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <aside
        className={`w-72 h-screen fixed left-0 top-0 bg-black/60 backdrop-blur-xl border-r border-gray-800 flex flex-col z-10 transition-transform duration-300 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center gap-2">
          <button
            onClick={onToggle}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-200"
            title="Close sidebar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/60 hover:text-white transition-all duration-200 text-sm"
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

        <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
              title="Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
            <button
              onClick={() => exportHistory(history)}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed transition-colors duration-200"
              title="Export history"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
          <span className="text-xs text-gray-600 text-center">Medusa AI</span>
        </div>
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onClearAll={onClearAll} />
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  history: PropTypes.array.isRequired,
  activeId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  onNewChat: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Sidebar