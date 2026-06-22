import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import { useActionState } from 'react'
import { explain } from '../../actions'

const CodeExplainForm = ({ onResult, onStatus, onClearView }) => {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const formRef = useRef(null)
  const submittedRef = useRef({ code: '', language: '' })

  const [formState, formAction, isPending] = useActionState(explain, null)

  const handleSubmit = (e) => {
    e.preventDefault()
    submittedRef.current = { code, language }
    const formData = new FormData()
    formData.set("code", code)
    formData.set("language", language)
    formAction(formData)
  }

  useEffect(() => {
    const error = formState?.success === false ? formState.error : null
    onStatus({ isPending, error })
  }, [isPending, formState, onStatus])

  useEffect(() => {
    if (formState?.success) {
      const { code: submittedCode, language: submittedLanguage } = submittedRef.current
      onResult({
        language: submittedLanguage,
        code: submittedCode,
        explanation: formState.data.explanation,
      })
    }
  }, [formState, onResult])

  const handleNewChat = () => {
    setCode("")
    setLanguage("javascript")
    onClearView()
    formRef.current?.reset()
  }

  return (
    <div className='w-full'>
      <form ref={formRef} onSubmit={handleSubmit} className='bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-2xl animate-pulseGlow'>
        <label className='block mb-2 font-semibold text-gray-300'>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='border border-gray-600 bg-gray-800 text-white rounded-lg p-2.5 w-full mb-5 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none'
        >
          <option value="javascript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="java">Java</option>
        </select>

        <label className='block mb-2 font-semibold text-gray-300'>Your Code:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder='Paste your code here...'
          className='text-white border border-gray-600 rounded-lg w-full p-3 font-mono text-sm bg-gray-800 min-h-[200px] resize-y focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none'
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="mt-4 px-10 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] hover:brightness-110 active:scale-95 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[var(--color-accent-glow)] hover:shadow-[var(--color-accent-glow-hover)]"
          >
            {isPending ? "Explaining..." : "Explain Code"}
          </button>
          <button
            type="button"
            onClick={handleNewChat}
            className="mt-4 px-6 py-2.5 rounded-lg font-semibold text-gray-300 border border-gray-700 hover:bg-gray-800 hover:text-white active:scale-95 transition-all duration-200"
          >
            New chat
          </button>
        </div>
      </form>
    </div>
  )
}

CodeExplainForm.propTypes = {
  onResult: PropTypes.func.isRequired,
  onStatus: PropTypes.func.isRequired,
  onClearView: PropTypes.func.isRequired,
}

export default CodeExplainForm