import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CodeExplanation = ({ explanation }) => {
  return (
    <div className='w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-2xl animate-fadeInUp animate-pulseGlow'>
      <h2 className='text-xl font-semibold mb-4 flex items-center gap-2' style={{ color: 'var(--color-accent)' }}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Explanation
      </h2>
      <div className="text-gray-300 leading-relaxed prose max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
      </div>
    </div>
  )
}

CodeExplanation.propTypes = {
  explanation: PropTypes.string.isRequired,
}

export default CodeExplanation
