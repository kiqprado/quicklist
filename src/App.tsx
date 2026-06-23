import { useState, useRef } from "react"
import { useBreakpoint } from "./hook/use-media-query"

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";


import { ToastMessage } from "./components/toast"
import { Trash2 } from "lucide-react"

gsap.registerPlugin(SplitText);

export default function App() {
  const [ item, setItem ] = useState('')
  const [ listItem, setListItem ] = useState<string[]>([])

  const [ checkedItems, setCheckedItems ] = useState<string[]>([])

  const [ toastMessage, setToastMessage ] = useState('')
  const [ messageType, setMessageType ] = useState<'add' | 'del'>('add')

  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const emptyListRef = useRef<HTMLSpanElement>(null);

  function HandleAddNewItem(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!item.trim()) {
      setMessageType('del')
      setToastMessage('Digite um item válido!')
      return
    }

    if(listItem.includes(item)) {
      setToastMessage(`${item} já está na lista`)
      setMessageType('del')
      setItem('')
      return
    }

    setListItem(prev => [...prev, item])
    setMessageType('add')
    setToastMessage( 
      mobileRangeFull ? `${item}  foi adicionado.` 
      : `${item}  foi adicionado a sua lista`
    )
    setItem('')
  }

  function HandleToggleCheckItem(item: string) {
    setCheckedItems((prev) => prev.includes(item)
      ? prev.filter((checked) => checked !== item)
      : [...prev, item]
    )
  }

  function HandleDelItem(ItemToDel: string) {
    setListItem((prev) => prev.filter((item) => item !== ItemToDel))
    setMessageType('del')
    setToastMessage(
      mobileRangeFull ? `${ItemToDel} foi removido!`
      : `${ItemToDel} removido da lista!`
    )
  }

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(
      [
        inputRef.current,
        buttonRef.current,
        emptyListRef.current
      ],
      {
        autoAlpha: 0,
        scale: 0.96
      }
    );

    const splitTitle = new SplitText(titleRef.current,{
      type:"chars"
    });

    tl.from(splitTitle.chars,{
      opacity:0,
      duration:0.1,
      stagger:0.1,
      ease:"power2.out"
    })

    .to(inputRef.current,{
      autoAlpha:1,
      scale:1,
      duration:0.5,
      ease:"power3.out"
    })

    .to(buttonRef.current,{
      autoAlpha:1,
      scale:1,
      duration:0.5,
      ease:"power3.out"
    }, "-=0.35")

    .add(()=>{
      if(emptyListRef.current){

        const splitEmpty = new SplitText(emptyListRef.current,{
          type:"chars"
        });


        gsap.set(emptyListRef.current,{
          autoAlpha:1
        });


        gsap.from(splitEmpty.chars,{
          autoAlpha:0,
          duration:0.05,
          stagger:0.05,
          ease:"power2.out"
        });

      }
    },"+=0.4");
  },[]);

  // BREAKPOINTS INDIVIDUALS
  const isMobileXS = useBreakpoint('mobileXS')
  const isMobileSM = useBreakpoint('mobileSM')
  const isMobileMD = useBreakpoint('mobileMD')
  const isMobileLG = useBreakpoint('mobileLG')
  const isMobileXL = useBreakpoint('mobileXL')
  
  /*const isTabletSM = useBreakpoint('tabletSM')
    const isTabletMD = useBreakpoint('tabletMD')
  
    const isDesktopSM = useBreakpoint('desktopSM')
    const isDesktopMD = useBreakpoint('desktopMD')
    const isDesktopLG = useBreakpoint('desktopLG')
    const isDesktopXL = useBreakpoint('desktopXL')
    const isDesktop2XL = useBreakpoint('desktop2XL')*/
  
  // GROUPS DE BREAKPOINTS
  
   const mobileRangeFull =
      isMobileXS ||
      isMobileSM ||
      isMobileMD ||
      isMobileLG ||
      isMobileXL
  
  /* const tabletRangeFull =
      isTabletSM ||
      isTabletMD
  
    const desktopRangeFull =
      isDesktopSM ||
      isDesktopMD ||
      isDesktopLG ||
      isDesktopXL ||
      isDesktop2XL */

  
  return (
    <div className="h-svh w-full flex relative">
      <div 
        className={`m-auto flex flex-col gap-4 items-center 
         ${mobileRangeFull ? 'w-[80%] h-[80%]' : 'w-[40%] h-[80%]'}`}>
        <h1 
          ref={titleRef}
          className="text-[#222522] tracking-wider text-2xl">
          Minha lista
        </h1>

        <form 
          onSubmit={HandleAddNewItem}
          action="" 
          className="flex flex-col gap-2 w-full">

          <input 
            ref={inputRef}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            type="text" 
            placeholder={`${listItem.length === 0 ? 'Adicione um primeiro item a sua lista' : 'Adicione um novo item'}`}
            className="px-6 py-2 rounded-xl
              border border-[#D7C9BA]
              bg-[#FDFCFB] text-[#8F7D70]
              placeholder:text-[#B9A89A]
              shadow-[0_8px_20px_rgba(0,0,0,0.06)]
              transition-all duration-300
              focus:-translate-y-1
              focus:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
            " 
          />
          
          <button 
            ref={buttonRef}
            type="submit"
            className="px-4 py-2 rounded-xl
              bg-[#B9C9B4] text-white text-lg tracking-wide
              border border-[#AABCA4]
              shadow-[0_10px_25px_rgba(162,185,158,0.35)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_18px_35px_rgba(162,185,158,0.45)]
              active:scale-[0.98] "
          >
            Adicionar item
          </button>
        </form>

        <ul 
          className={`mt-12 w-full overflow-y-auto 
          ${mobileRangeFull ? 'h-[72%]' : 'h-[56%]'}
          flex flex-col gap-4 py-2`}
        >
          {listItem.length === 0 ? (
            <span 
              ref={emptyListRef} 
              className="block  text-center"
            >
              Sua lista está zerada, adicione items no campo acima!
            </span>
          ) : (
            listItem.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-4 px-6 py-3 rounded-2xl
                border border-[#F0E6DB]
                ${ checkedItems.includes(item) 
                  ? 'bg-[#B9C9B4]' 
                  : 'bg-[#FEFEFE] hover:bg-[#F3EFEA]'}
                shadow-[0_10px_25px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)]`}
              >
                <input 
                  checked={checkedItems.includes(item)}
                  onChange={() => HandleToggleCheckItem(item)}
                  type="checkbox" 
                  className="h-4 w-4 accent-[#9FB594]" /> 
                <span 
                  className={`text-lg capitalize 
                  ${checkedItems.includes(item) ? 'text-[#FEFEFE]' : 'text-[#4B342F]'}`}
                >
                  {item}
                </span> 
                <button 
                  onClick={() => HandleDelItem(item)}
                  className="ml-auto
                  text-zinc-500
                  transition-all duration-300
                  hover:text-red-400
                  hover:scale-110"
                >
                  <Trash2 size={20}/>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      {toastMessage && (
        <ToastMessage
          message={toastMessage}
          messageType={messageType}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  )
}
