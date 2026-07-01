import { Trash2 } from "lucide-react"

interface IList {
  mobileRangeFull: boolean
  listItem: string[]
  emptyListRef: React.RefObject<HTMLSpanElement | null>
  checkedItems: string[]
  HandleToggleCheckItem(item: string): void
  HandleDelItem(ItemToDel: string): void
}

export function List({
  mobileRangeFull,
  listItem,
  emptyListRef,
  checkedItems,
  HandleToggleCheckItem,
  HandleDelItem
}: IList) {
  return(
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
              className="h-4 w-4 accent-[#9FB594]" 
            /> 
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
  )
}