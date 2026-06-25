import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'

const themes = [
  {
    id: 'green',
    label: 'Green',
    colors: ['#34d399', '#0d9488', '#022c22'],
  },
  {
    id: 'purple',
    label: 'Purple',
    colors: ['#a78bfa', '#7c3aed', '#1e1b4b'],
  },
  {
    id: 'red',
    label: 'Red',
    colors: ['#f87171', '#dc2626', '#1c1017'],
  },
  {
    id: 'blue',
    label: 'Blue',
    colors: ['#60a5fa', '#2563eb', '#0a1628'],
  },
  {
    id: 'orange',
    label: 'Orange',
    colors: ['#fb923c', '#ea580c', '#1c0f06'],
  },
  {
    id: 'pink',
    label: 'Pink',
    colors: ['#f472b6', '#db2777', '#1c0a14'],
  },
  {
    id: 'yellow',
    label: 'Yellow',
    colors: ['#fbbf24', '#d97706', '#1c1406'],
  },
]

const SettingsModal = ({ open, onClose, onClearAll }) => {
  const { theme: activeTheme, setTheme, animationsEnabled, toggleAnimations, codeTheme, toggleCodeTheme } = useTheme()
  const { showToast } = useToast()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 w-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">Theme</p>

        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); showToast(`Theme: ${t.label}`, 'success'); onClose() }}
              className={`relative rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 ${
                activeTheme === t.id
                  ? 'border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent-glow)]'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.colors[0]}33, ${t.colors[1]}22)`,
              }}
            >
              <div className="flex gap-1.5 mb-3">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/10"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-white">{t.label}</span>
              {activeTheme === t.id && (
                <div
                  className="absolute top-2 right-2 w-3 h-3 rounded-full"
                  style={{ background: 'var(--color-accent)' }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-800 my-6" />

        <p className="text-sm text-gray-400 mb-4">Display</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-300">Background animations</span>
          <button
            onClick={() => { toggleAnimations(); showToast(animationsEnabled ? 'Animations off' : 'Animations on', 'info') }}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              animationsEnabled ? 'bg-[var(--color-accent)]' : 'bg-gray-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                animationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-300">Code input theme</span>
          <button
            onClick={() => { toggleCodeTheme(); showToast(`Code theme: ${codeTheme === 'dark' ? 'Light' : 'Dark'}`, 'info') }}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              codeTheme === 'dark' ? 'bg-[var(--color-accent)]' : 'bg-gray-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                codeTheme === 'dark' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-gray-500 -mt-3 mb-4">{codeTheme === 'dark' ? 'Dark' : 'Light'}</p>

        <div className="h-px bg-gray-800 my-6" />

        <p className="text-sm text-gray-400 mb-4">History</p>
        <button
          onClick={() => { onClearAll(); showToast('All history cleared', 'info') }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:border-red-700 transition-all duration-200 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear all history
        </button>

        <div className="h-px bg-gray-800 my-6" />

        <p className="text-sm text-gray-400 mb-4">About Me</p>

        <div className="space-y-3">
          <div>
            <p className="text-base font-semibold text-white">Md. Sakib Chowdhury</p>
          </div>

          <a
            href="mailto:csakib049@gmail.com"
            className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">csakib049@gmail.com</span>
          </a>

          <div className="flex flex-wrap gap-2 pt-1">
            <a href="https://github.com/csakib049" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" title="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/md-sakib-chowdhury-3990791a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" title="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/muntasir.sakib.376/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" title="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a href="https://www.instagram.com/s_a_a_k_i_b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" title="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth={2} />
                <circle cx="12" cy="12" r="5" strokeWidth={2} />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <a href="https://discordapp.com/users/1081408248197939363" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" title="Discord">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

SettingsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
}

export default SettingsModal