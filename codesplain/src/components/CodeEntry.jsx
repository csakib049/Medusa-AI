import { useState, useCallback } from 'react'
import Header from "./Header"
import CodeExplainForm from "./forms/CodeExplainForm"
import CodeExplanation from './CodeExplanation'
import Error from './Error'
import Sidebar from "./Sidebar"

const CodeEntry = () => {
  const [history, setHistory] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [currentExplanation, setCurrentExplanation] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

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
  }, [history])

  const handleDelete = useCallback((id) => {
    setHistory(prev => prev.filter(h => h.id !== id))
    if (activeId === id) {
      setActiveId(null)
      setCurrentExplanation(null)
    }
  }, [activeId])

  const handleNewChat = useCallback(() => {
    setActiveId(null)
    setCurrentExplanation(null)
    setIsPending(false)
    setError(null)
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
      />
      <div className="flex-1 flex min-h-0 ml-72">
        <div className="w-[480px] flex-shrink-0 overflow-hidden pt-6 px-6 flex flex-col">
          <Header/>
          <CodeExplainForm
            onResult={handleResult}
            onStatus={handleStatus}
            onClearView={handleNewChat}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-6 pl-0">
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
          {showLoading && (
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-2xl animate-fadeInUp">
              <div className="flex items-center gap-3 text-gray-400">
                <div className="animate-spin w-5 h-5 border-2 border-t-transparent rounded-full" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
                <span>Analyzing your code...</span>
              </div>
            </div>
          )}
          {showExplanation && (
            <CodeExplanation explanation={currentExplanation} />
          )}
          {showError && (
            <Error error={error} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeEntry