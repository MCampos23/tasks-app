export default function SideBar(){
    return(
        <div className="w-1/4 h-screen mt-12 bg-gray-800 rounded-tr-lg text-left pt-12 pl-12">
            <h2 className="mb-6 text-xl text-gray-200 font-bold">YOUR PROJECTS</h2>
            <button className="mb-6  py-2 px-4 rounded bg-gray-500 text-gray-300 hover:bg-gray-400 hover:text-gray-200">+ Add Project</button>
            <div>
                <ul>
                    <li className="p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200 hover:cursor-pointer rounded-l">Learning React</li>
                    <li className="p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200 hover:cursor-pointer rounded-l">Mastering React</li>
                </ul>
            </div>
        </div>
    )

};