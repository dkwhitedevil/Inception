import { useState } from 'react'
import { useRouter } from 'next/router'
import BackgroundVideo from '../components/BackgroundVideo'

export default function Home() {
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background video should load and then navigate to /login when it ends */}
      <BackgroundVideo onLoaded={() => setVideoReady(true)} onError={() => { setVideoError(true); setVideoReady(true); }} onEnded={() => router.push('/login')} />
    </main>
  )
}
