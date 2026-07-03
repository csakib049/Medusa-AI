import { useState, useCallback, useRef, useEffect } from 'react'
import Header from "./Header"
import CodeExplainForm from "./forms/CodeExplainForm"
import CodeExplanation from './CodeExplanation'
import Error from './Error'
import Sidebar from "./Sidebar"
import Skeleton from './Skeleton'
import { useToast } from '../context/ToastContext'

const CodeEntry = () => {
  const [history, setHistory] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [currentExplanation, setCurrentExplanation] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setShowScrollTop(el.scrollTop > 300)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResult = useCallback((result) => {
    const id = Date.now()
    const title = result.code?.split('\n')[0]?.slice(0, 50) || result.language || 'Untitled'
    const entry = { id, title, ...result }
    setHistory(prev => [entry, ...prev])
    setActiveId(id)
    setCurrentExplanation(entry.explanation)
    setError(null)
  }, [])

  const handleStatus = useCallback(({ isPending: pending, error: err }) => {
    setIsPending(pending)
    if (err) setError(err)
  }, [])

  const handleSelect = useCallback((id) => {
    const entry = history.find(h => h.id === id)
    if (entry) {
      setActiveId(id)
      setCurrentExplanation(entry.explanation)
      setError(null)
    }
    setSidebarOpen(false)
  }, [history])

  const handleDelete = useCallback((id) => {
    setHistory(prev => prev.filter(h => h.id !== id))
    if (activeId === id) {
      setActiveId(null)
      setCurrentExplanation(null)
    }
    showToast('History deleted', 'info')
  }, [activeId, showToast])

  const handleClearAll = useCallback(() => {
    setHistory([])
    setActiveId(null)
    setCurrentExplanation(null)
    setError(null)
  }, [])

  const handleNewChat = useCallback(() => {
    setActiveId(null)
    setCurrentExplanation(null)
    setIsPending(false)
    setError(null)
    setSidebarOpen(false)
  }, [])

  const showLoading = isPending
  const showExplanation = currentExplanation && !isPending
  const showError = error && !isPending

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        history={history}
        activeId={activeId}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[5] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex min-h-0 md:ml-72">
        <div className="w-full md:w-[480px] flex-shrink-0 overflow-hidden pt-6 px-6 flex flex-col">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
              title="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1">
              <Header/>
            </div>
          </div>
          <CodeExplainForm
            onResult={handleResult}
            onStatus={handleStatus}
            onClearView={handleNewChat}
          />
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 pl-0">
          {!showLoading && !showExplanation && !showError && (
            <div className="h-full flex items-center justify-center text-gray-600 animate-fadeInUp">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Your explanation will appear here</p>
                <p className="text-sm mt-2">Submit your code to get started</p>
              </div>
            </div>
          )}
          {showLoading && <Skeleton />}
          {showExplanation && (
            <CodeExplanation explanation={currentExplanation} />
          )}
          {showError && (
            <Error error={error} />
          )}
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-900 border border-gray-700 text-gray-300 shadow-lg transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[var(--color-accent-glow)] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        title="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

export default CodeEntry