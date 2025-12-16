import { useState } from 'react'
import BackgroundVideo from '../components/BackgroundVideo'
import GoogleSignIn from '../components/GoogleSignIn'
import dynamic from 'next/dynamic'

// TopScene uses browser-only APIs (three.js); load it client-side only
const TopScene = dynamic(() => import('../components/TopScene'), { ssr: false, loading: () => <div className="w-[240px] h-[240px]" /> })

export default function Login() {
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  return (
    <main className="min-h-screen relative overflow-hidden bg-black text-white">
      
      {/* ensure a solid black background if video doesn't cover */}
      <div className="fixed inset-0 bg-black -z-20" />

      {/* Top spinner while video is loading */}
      {!videoReady && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-white rounded-full" />
        </div>
      )}

      {/* App name below the top spinner */}
      <div className="fixed top-25 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <h1 className="text-4xl font-bold">Inception</h1>
      </div>

      {/* 3D spinning top (center) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[840px] h-[740px] z-20">
        <TopScene />
      </div>

     
    </main>
  )
}
