import { useEffect, useState } from 'react'
import { breakpointRanges, type Breakpoint } from '../styles/breakpoint'

export function useBreakpoint(breakpoint: Breakpoint) {
  const [matches, setMatches] = useState(false)

  useEffect(function setupMediaQuery() {
    const range = breakpointRanges[breakpoint]
    const queryParts: string[] = []

    if (range.min !== undefined) {
      queryParts.push(`(min-width: ${range.min}px)`)
    }

    if (range.max !== undefined) {
      queryParts.push(`(max-width: ${range.max}px)`)
    }

    const mediaQuery = queryParts.join(' and ')
    const media = window.matchMedia(mediaQuery)

    function updateMatches() {
      setMatches(media.matches)
    }

    updateMatches()

    media.addEventListener('change', updateMatches)

    return function cleanup() {
      media.removeEventListener('change', updateMatches)
    }
  }, [breakpoint])

  return matches
}