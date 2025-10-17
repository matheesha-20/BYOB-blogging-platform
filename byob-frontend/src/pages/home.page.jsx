import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import TrendingBlogPost from "../components/trending-blog-post.component";

const HomePage = () => {

    let [ latestBlogs, setLatestBlogs ] = useState(null);
    let [ trendingBlogs, setTrendingBlogs ] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then(({ data: { blogs } }) => {
            setLatestBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
        .then(({ data: { blogs } }) => {
            setTrendingBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchLatestBlogs();
        fetchTrendingBlogs();
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

                        { trendingBlogs == null ? <Loader />
                        : trendingBlogs.map((blog, index) => (
                            <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                <TrendingBlogPost content={blog} author={blog.author.personal_info} index={index} />

                            </AnimationWrapper>
                        ))
                       }
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