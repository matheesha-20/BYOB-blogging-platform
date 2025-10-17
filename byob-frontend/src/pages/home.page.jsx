import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import TrendingBlogPost from "../components/trending-blog-post.component";
import MinimalBlogPost from "../components/minimal-blog-post-component.jsx";

const HomePage = () => {

    let [ latestBlogs, setLatestBlogs ] = useState(null);
    let [ trendingBlogs, setTrendingBlogs ] = useState(null);

    let categories = ["Technology", "Health", "Travel", "Food", "Lifestyle", "Education", "Finance", "Entertainment"];

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
                <div className="min-w-[40%] lg:min-w-[500px] max-w-min border-l border-emerald-400 pl-8 pt-3 max-md:hidden">

                    <div className="flex flex-col gap-10">

                        <h1 className="font-medium text-xl mb-8">Find Your Next Read !</h1>

                    </div>

                    <div>
                        <h1 className="font-medium text-xl mb-8">
                            Trending <i className="fi fi-rr-arrow-trend-up text-emerald-500"></i>
                        </h1>
                    </div>
                    { trendingBlogs == null ? <Loader />
                        : trendingBlogs.map((blog, index) => (
                            <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />

                            </AnimationWrapper>
                        ))
                       }
                </div>
            </section>
        </AnimationWrapper>

    )
}

export default HomePage;