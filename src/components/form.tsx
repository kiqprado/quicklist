interface IForm {
  HandleAddNewItem: (e: React.SubmitEvent<HTMLFormElement>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  item: string
  setItem: (value: React.SetStateAction<string>) => void
  listItem: string[]
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export function Form({ 
  HandleAddNewItem, 
  inputRef, 
  item, 
  setItem,
  listItem,
  buttonRef
}: IForm) {
  return(
    <form 
      onSubmit={HandleAddNewItem}
      action="" 
      className="flex flex-col gap-2 w-full"
    >
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
          focus:shadow-[0_12px_28px_rgba(0,0,0,0.08)]" 
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
  )
}