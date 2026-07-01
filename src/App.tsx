import { useState, useRef } from "react"
import { useBreakpoint } from "./hook/use-media-query"
import { Normalize } from "./hook/normalize-text";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import { ToastMessage } from "./components/toast"
import { Form } from "./components/form";
import { List } from "./components/list";

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

    if(listItem.some(list => Normalize(list) === Normalize(item))) {
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

        <Form
          HandleAddNewItem={HandleAddNewItem}
          inputRef={inputRef}
          item={item}
          setItem={setItem}
          listItem={listItem}
          buttonRef={buttonRef}
        />

        <List
          mobileRangeFull={mobileRangeFull}
          listItem={listItem}
          HandleDelItem={HandleDelItem}
          emptyListRef={emptyListRef}
          checkedItems={checkedItems}
          HandleToggleCheckItem={HandleToggleCheckItem}
        />

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
