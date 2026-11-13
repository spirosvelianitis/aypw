import { useState } from 'react';
import { Droplets } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  titleFallback: string;
  className?: string;
}

export function ResilientImage({ src, alt, titleFallback, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-sky-100 text-slate-500 p-6 text-center ${className}`}
      >
        <Droplets className="w-8 h-8 text-sky-700 mb-3" aria-hidden="true" />
        <span className="text-sm font-medium text-slate-700">{titleFallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
