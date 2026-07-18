import PropTypes from 'prop-types'

const Error = ({ error }) => {
  return (
    <div className='w-full bg-red-900/20 backdrop-blur-sm border border-red-700 p-6 rounded-2xl shadow-2xl'>
      <p className='text-red-400 flex items-center gap-2 text-sm'>
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Error
