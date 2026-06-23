import { useState } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useToast } from '../context/ToastContext'

const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')

  if (match) {
    return (
      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" customStyle={{ borderRadius: '8px', fontSize: '0.875rem' }}>
        {code}
      </SyntaxHighlighter>
    )
  }

  return <code className={className}>{children}</code>
}

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

const CodeExplanation = ({ explanation }) => {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(explanation)
      setCopied(true)
      showToast('Copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      showToast('Failed to copy', 'info')
    }
  }

  return (
    <div className='w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-2xl animate-fadeInUp animate-pulseGlow'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold flex items-center gap-2' style={{ color: 'var(--color-accent)' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Explanation
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="text-gray-300 leading-relaxed prose max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock,
          }}
        >
          {explanation}
        </Markdown>
      </div>
    </div>
  )
}

CodeExplanation.propTypes = {
  explanation: PropTypes.string.isRequired,
}

export default CodeExplanation