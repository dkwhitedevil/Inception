import React from 'react';

type Props = {
  onLoaded?: () => void;
  onError?: (ev: any) => void;
  onEnded?: () => void;
  loop?: boolean;
  className?: string;
};

export default function BackgroundVideo({ onLoaded, onError, onEnded, loop = false, className = '' }: Props) {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleCanPlay = () => onLoaded?.();
    const handleError = (ev: any) => {
      console.error('BackgroundVideo failed to load', ev);
      // notify consumer
      onError?.(ev);
      // allow the page to continue showing content
      onLoaded?.();
    };
    const handleEnded = () => onEnded?.();

    el.addEventListener('canplaythrough', handleCanPlay);
    el.addEventListener('error', handleError as EventListener);
    el.addEventListener('ended', handleEnded);

    return () => {
      el.removeEventListener('canplaythrough', handleCanPlay);
      el.removeEventListener('error', handleError as EventListener);
      el.removeEventListener('ended', handleEnded);
    };
  }, [onLoaded, onError, onEnded]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop={loop}
      playsInline
      preload="auto"
      className={`fixed inset-0 object-cover -z-10 w-full h-full ${className}`}
    >
      {/* Use the shipped asset name. If you change the file in `public/`, update this path. */}
      <source src="/Top_Spinning_Video_Generated.mp4" type="video/mp4" />
      {/* Fallback content */}
      <div>Background video not supported</div>
    </video>
  );
}
