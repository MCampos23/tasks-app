export default function Button({text, ...props}) {
    return(
        <button 
            {...props}
            className="mb-6 text-xs md:text-base py-2 px-4 rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 hover:cursor-pointer">
                {text}
        </button>
    )
}