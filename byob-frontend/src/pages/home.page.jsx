import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";

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
                            latestBlogs == null ? <Loader /> 
                            : latestBlogs.map((blog, index) => (
                                <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                    <BlogPostCard content={blog} author={blog.author.personal_info} />

                                </AnimationWrapper>
                            ))
                               
            
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