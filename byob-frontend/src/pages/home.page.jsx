import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";

const HomePage = () => {

    let [ latestBlogs, setLatestBlogs ] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then(({ data: { blogs } }) => {
            setLatestBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchLatestBlogs();
    }, [])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">

                    <InPageNavigation routes={["Home", "Trending"]} defaultHidden={"Trending"}>

                       <>
                       {
                            latestBlogs == null ? 
                                <Loader /> :
                                <Loader /> 
            
                        }
                       </>

                        <h2>gi</h2>

                    </InPageNavigation>

                </div>

                {/* filters and trending blogs */}
                <div>

                </div>
            </section>
        </AnimationWrapper>

    )
}

export default HomePage;