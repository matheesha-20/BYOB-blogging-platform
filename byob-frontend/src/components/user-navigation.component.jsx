import { UserContext } from "../App";
import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {

    const { userAuth: { username } } = useContext(UserContext);

    return(
        <AnimationWrapper 
                transition={{ duration: 0.2}}>

                    <div className="bg-white abosolute  right-0 border border-gray-300 w-60 p-2 overflow-hidden duration-200 translate-x-full animate-slide-in">
   
                        <Link to="/home" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Home
                        </Link>

                        <Link to="/write" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Write
                        </Link>

                        <Link to={`/user/${username}`} className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Profile
                        </Link>

                        <Link to="/dashboard" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Dashboard
                        </Link>

                        <Link to="/trending" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Trending
                        </Link>

                        <Link to="/settings" className="md:hidden link flex gap-2 text-xl text-slate-600 hover:text-emerald-600 transition">
                                        Settings
                        </Link>

                    </div> 

        </AnimationWrapper>
    )
}

export default UserNavigationPanel;