import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import UserNavigationPanel from "./user-navigation.component"

const Navbar = () => {

    const [ searchBoxVisibility, setSearchBoxVisibility ] = useState(false);
    const [ userNavPanel, setUserNavPanel ] = useState(false);

    const { userAuth } = useContext(UserContext);
    const access_token = userAuth?.access_token;
    const profile_img = userAuth?.profile_img;

    const handelUserNavPanel = () => {
        setUserNavPanel(currentval => !currentval);
    }

    const handelBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 250);
    }

    return (
                
        <header id="header" className="text-xl font-bold text-emerald-700 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-emerald-700"><h1 className="text-2xl font-bold text-emerald-700">-__BYOB__-</h1></a>

            <div className="md:flex space-x-8 md:relative md:block md:insert-0 md:p-0 md:w-auto">
                <div className={"relative w-full max-w-md " + (searchBoxVisibility ? "show" : "hide")}>
                <button 
                    className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-search text-emerald-500 text-lg"></i>
                </button>
                       <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 bg-transparent text-slate-600 placeholder-emerald-500 focus:placeholder-slate-400 hover:text-emerald-600 border-none focus:outline-none transition duration-300 hover:text-emerald-600 focus:text-emerald-500"
                            />
                            
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 opacity-30"></div>

                            <div className="absolute bottom-0 left-0 w-full h-[3px] overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan">  
                                </div>
                            </div>
                        </div>

            </div>
                <button  onClick={() => setSearchBoxVisibility(currentval => !currentval)}>
                    <i className="fas fa-search text-emerald-500 text-2xl"></i>
                    
                    </button>


                <div className="flex space-x-6 items-center">
                <div className="flex space-x-6 items-center">
                    <a href="/src/pages/home.page.jsx" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Home</a>
                    <a href="editor" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Write</a>
                    <a href="#trending" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Dashboard</a>
                    <a href="#profile" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Trending</a>

                    {

                        access_token ?(

                            <>
                                    <Link to="/dashboard/notification">

                                        <button className="w-10 h-10 rounded-full bg-grey relative hover:bg-green-500/10">
                                            <i className="fi fi-ss-bell text-2xl block mt-1"></i>

                                        </button>

                                    </Link>
                                    
                                    <div className="relative" tabIndex={0} onClick={handelUserNavPanel} onBlur={handelBlur}>

                                        <button className="w-10 h-10 mt-1">
                                            <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                                        </button>

                                        {
                                            userNavPanel ?
                                            <UserNavigationPanel/>
                                            : ""
                                        }
                                        

                                    </div>
                            </>

                        ):(
                        <>
                            
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
                        </>

                    )}

                    
                    

                </div>
                </div>

            </div>
        </nav>
    </header> 
        
        
    )
}

export default Navbar



