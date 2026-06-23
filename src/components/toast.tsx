import { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { useBreakpoint } from "../hook/use-media-query"

import { Check, X } from "lucide-react"

type ToastMessageProps = {
  message: string
  messageType: 'add' | 'del'
  onClose: () => void
}

export function ToastMessage({ message, onClose, messageType }: ToastMessageProps) {
  const toastRef = useRef<HTMLDivElement>(null)

  // BREAKPOINTS INDIVIDUALS
      const isMobileXS = useBreakpoint('mobileXS')
      const isMobileSM = useBreakpoint('mobileSM')
      const isMobileMD = useBreakpoint('mobileMD')
      const isMobileLG = useBreakpoint('mobileLG')
      const isMobileXL = useBreakpoint('mobileXL')

      const mobileRangeFull =
      isMobileXS ||
      isMobileSM ||
      isMobileMD ||
      isMobileLG ||
      isMobileXL

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onClose
    })

    tl.fromTo(toastRef.current, {
      opacity: 0,
      y: 30
    },{
      opacity: 1,
      y: 0,
      duration: .3,
      ease: 'power3.out'
    })

    tl.to({}, {
      duration: 5
    })

    tl.to(toastRef.current, {
      opacity: 0,
      y: 30,
      duration: .25,
      ease: 'power2.in'
    })
  }, [])

  return (
    <div
      ref={toastRef}
      className={`absolute left-1/2 -translate-x-1/2 bottom-6 z-50
        flex items-center gap-5 px-6 py-5 overflow-hidden
        ${mobileRangeFull ? 'min-w-[88%]' : 'min-w-100'}
        rounded-2xl bg-white/90 backdrop-blur-md
        border border-[#ECE4DB] shadow-[0_20px_45px_rgba(0,0,0,0.08)]`}
    >
      <div
        className={`flex items-center justify-center h-6 w-6
          rounded-full  
          ${messageType === 'add' 
            ? 'text-white bg-[#94BB8B] shadow-[0_8px_20px_rgba(148,187,139,0.4)]' 
            : 'text-black bg-[#E57373] shadow-[0_8px_20px_rgba(229,115,115,0.4)]'}
          `}
      >
        {messageType === 'add' ? <Check size={18} /> : <X size={18} /> } 
      </div>

      <span
        className="flex-1 text-lg tracking-wide
        text-[#40302B]"
      >
        {message}
      </span>

      <div 
        className={`toast-progress 
        ${messageType === 'add' ? 'bg-[#94BB8B]' : 'bg-[#D67A7A]'}`} 
      />
    </div>
  )
}