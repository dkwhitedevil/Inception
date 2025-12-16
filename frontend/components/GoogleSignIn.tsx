import { useState } from 'react'

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSignIn = async () => {
    if (loading) return
    setLoading(true)
    setResult(null)

    try {
      const prompt = 'User submitted prompt: safe example'
      const res = await fetch('http://localhost:4000/infer-escrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setResult(String(err?.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded bg-black/60 p-8 shadow-lg backdrop-blur-sm border border-white/5 text-white flex flex-col items-center gap-4">

      {/* Custom animated button */}
      <button
        onClick={handleSignIn}
        disabled={loading}
        className={`uiverse-button ${loading ? 'disabled' : ''}`}
      >
        <div className="bgContainer">
          <span>{loading ? 'Signing in…' : 'Sign in with Google'}</span>
          <span>{loading ? 'Signing in…' : 'Sign in with Google'}</span>
        </div>

        <div className="arrowContainer">
          <svg
            width="25"
            height="25"
            viewBox="0 0 45 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>

      {result && (
        <pre className="mt-2 text-sm bg-white/5 text-white p-3 rounded w-full max-w-md overflow-x-auto">
          {result}
        </pre>
      )}
    </div>
  )
}
