export const breakpoints = {
  // Mobile
  mobileXS: 1,      // 1–359
  mobileSM: 360,    // 360–389
  mobileMD: 390,    // 390–429
  mobileLG: 430,    // 430–575
  mobileXL: 576,    // 576–767

  // Tablet
  tabletSM: 768,    // 768–833
  tabletMD: 834,    // 834–1023

  // Desktop
  desktopSM: 1024,  // 1024–1279
  desktopMD: 1280,  // 1280–1439
  desktopLG: 1440,  // 1440–1919
  desktopXL: 1920,  // 1920–2559
  desktop2XL: 2560  // 2560+
} as const

export type Breakpoint = keyof typeof breakpoints

const keys = Object.keys(breakpoints) as Breakpoint[]

export const breakpointRanges: Record<
  Breakpoint,
  {
    min?: number
    max?: number
  }
> = keys.reduce((acc, key, index) => {
  const min = breakpoints[key]
  const next = keys[index + 1]

  acc[key] = {
    min,
    max: next ? breakpoints[next] - 1 : undefined
  }

  return acc
}, {} as Record<Breakpoint, { min?: number; max?: number }>)