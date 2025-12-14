import { useState } from 'react'

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSignIn = async () => {
    setLoading(true)
    setResult(null)

    try {
      // In a real app, integrate Firebase / Supabase here.
      // For now we simulate a sign-in and call the backend escrow endpoint.
      const prompt = 'User submitted prompt: safe example'
      const res = await fetch('http://localhost:4000/infer-escrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setResult(JSON.stringify(data))
    } catch (err: any) {
      setResult(String(err?.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded bg-black/60 p-8 shadow-lg backdrop-blur-sm border border-white/5 text-white">
      <h2 className="text-xl font-semibold text-white">Sign in</h2>
      <p className="mt-2 text-sm text-gray-300">Sign in with Google (mock)</p>
      <button
        onClick={handleSignIn}
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 disabled:opacity-60 transition"
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign in with Google'}
      </button>

      {result && (
        <pre className="mt-4 text-sm bg-white/5 text-white p-2 rounded">{result}</pre>
      )}
    </div>
  )
}
