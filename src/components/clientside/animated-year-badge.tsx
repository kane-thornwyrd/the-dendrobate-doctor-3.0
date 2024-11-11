'use client'
import { useState, useEffect } from 'react'

export function AnimatedYearBadge({ year = "2023" }: { year?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        px-2 py-0 mx-1
        bg-transparent
        transition-all duration-1000 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
        relative overflow-hidden
      `}
      role="status"
      aria-label={`Highlighted year: ${year}`}
    >
      <span className="text-lg font-bold text-gray-900 relative z-10">{year}</span>
      <span className="sr-only">Highlighted year</span>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 opacity-10 animate-pulse"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
        }}
      ></div>
    </span>
  )
}
