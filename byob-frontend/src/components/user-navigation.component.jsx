import { UserContext } from "../App";
import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth } = useContext(UserContext);
    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null });
    }

    return(
        <AnimationWrapper 
                className="absolute right-0 z-50"
                transition={{ duration: 0.2}}>

                    <div className="bg-white abosolute  right-0 border border-gray-300 w-60 p-2  duration-200 translate-x-full animate-slide-in">
   
                        <Link to="/home" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Home
                        </Link>

                        <Link to="/editor" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Write
                        </Link>

                        <Link to={`/user/${username}`} className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Profile
                        </Link>

                        <Link to="/dashboard/blogs" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Dashboard
                        </Link>

                        <Link to="/trending" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Trending
                        </Link>

                        <Link to="/settings/edit-profile" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Settings
                        </Link>

                        <span className="absolute border-t border-grey  w-[100%]">
                        </span>

                        <button className="text-left p-4 hover:bg-grey w-full pl-3 py-2"
                                onClick={signOutUser}>
                            <h1 className="font-bold text-xl mb-1">Sign Out</h1>
                            <p className="text-dark-grey">@{username}</p>
                        </button>

                    </div> 

        </AnimationWrapper>
    )
}

export default UserNavigationPanel;