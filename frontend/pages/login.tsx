import BackgroundVideo from '../components/BackgroundVideo'
import GoogleSignIn from '../components/GoogleSignIn'

export default function Login() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black text-white">
      <BackgroundVideo loop />
      {/* ensure a solid black background if video doesn't cover */}
      <div className="fixed inset-0 bg-black -z-20" />
      <div className="flex h-screen items-center justify-center z-10">
        <GoogleSignIn />
      </div>
    </main>
  )
}
