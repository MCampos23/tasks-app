export default function SideBar(){
    return(
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold md:text-xl text-stone-200 ">YOUR PROJECTS</h2>
            <button className="mb-6 text-xs md:text-base py-2 px-4 rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 hover:cursor-pointer">+ Add Project</button>
            <div>
                <ul>
                    <li className="p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200 hover:cursor-pointer rounded-l">Learning React</li>
                    <li className="p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200 hover:cursor-pointer rounded-l">Mastering React</li>
                </ul>
            </div>
        </aside>
    )

};