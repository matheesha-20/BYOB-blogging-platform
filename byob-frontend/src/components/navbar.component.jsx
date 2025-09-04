import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [ searchBoxVisibility, setSearchBoxVisibility ] = useState(false)

    return (
                
        <header id="header" className="text-xl font-bold text-emerald-700 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-emerald-700"><h1 className="text-2xl font-bold text-emerald-700">-__BYOB__-</h1></a>

            <div className="md:flex space-x-8 md:relative md:block md:insert-0 md:p-0 md:w-auto">
                <div className={"relative w-full max-w-md " + (searchBoxVisibility ? "show" : "hide")}>
                <button 
                    onclick="handleSearchClick()" 
                    className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-search text-emerald-500 text-lg"></i>
                </button>
                        <input 
                                type="text" 
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-full text-slate-600 placeholder-emerald-500 focus:placeholder-slate-400 hover:text-emerald-600 transition border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 "/>
            </div>
                <button  onClick={() => setSearchBoxVisibility(currentval => !currentval)}>
                    <i className="fas fa-search text-emerald-500 text-2xl"></i>
                    
                    </button>

                <div className="flex space-x-6 items-center">
                <div className="flex space-x-6 items-center">
                    <a href="#home" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Home</a>
                    <a href="#write" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Write</a>
                    <a href="#trending" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Trending</a>
                    <a href="#profile" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Profile</a>

                    <Link to="/signin">
                    <button className="bg-white text-emerald-500 font-semibold px-5 py-2 rounded-full border border-emerald-500 hover:bg-emerald-50 transition min-w-[100px] text-center">
                            Sign In
                    </button>
                    </Link>
                    

                    <Link to="/signup">
                    <button className="hidden md:block bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition min-w-[100px] text-center">
                            Sign up
                    </button>
                    </Link>
                    

                </div>
                </div>

            </div>
        </nav>
    </header> 
        
        
    )
}

export default Navbar



