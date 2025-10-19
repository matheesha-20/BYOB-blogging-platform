import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import TrendingBlogPost from "../components/trending-blog-post.component";
import MinimalBlogPost from "../components/minimal-blog-post-component.jsx";
import NoDataMessage from "../components/nodata.component";

const HomePage = () => {

    let [ latestBlogs, setLatestBlogs ] = useState(null);
    let [ trendingBlogs, setTrendingBlogs ] = useState([]);
    let [ pageState, setPageState ] = useState("Home");

    let categories = ["Technology", "Health", "Travel", "Food", "Lifestyle", "Education", "Finance", "Entertainment", "Universe", "Netflix"];

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then(({ data: { blogs } }) => {
            setLatestBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
        .then(({ data: { blogs } }) => {
            setTrendingBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const fetchBlogsByCategory = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState })
        .then(({ data: { blogs } }) => {
            setLatestBlogs(blogs);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const loadBlogByCategory = (e) => {

        //e.target.classList.add('bg-slate-600');

        
        
         let category = e.target.innerText.toLowerCase();
        
            setLatestBlogs(null);

            if (pageState == category) {
                 setPageState("Home");
                 //e.target.classList.remove('bg-slate-600');
                 return;
            }
            setPageState(category);

    };

    useEffect(() => {

        if (pageState == "Home") {
            fetchLatestBlogs();
        }else {
            fetchBlogsByCategory();
        }

        fetchTrendingBlogs();

    }, [pageState]);

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10 pl-10 pr-5">
                {/* latest blogs */}
                <div className="w-full">

                    <InPageNavigation routes={[ pageState, "Trending"]} defaultHidden={"Trending"}>

                       <>
                       {
                            latestBlogs == null ? <Loader /> 
                            :  latestBlogs.length == 0 ? <NoDataMessage message={"No blogs found !"}/>
                            :latestBlogs.map((blog, index) => (
                                <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                    <BlogPostCard content={blog} author={blog.author.personal_info} />

                                </AnimationWrapper>
                            ))
                               
            
                        }
                       </>

                        { trendingBlogs == null ? <Loader />
                        : trendingBlogs.length == 0 ? <NoDataMessage message={"No trending blogs found !"}/>
                        :
                        trendingBlogs.map((blog, index) => (
                            <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                <TrendingBlogPost content={blog} author={blog.author.personal_info} index={index} />

                            </AnimationWrapper>
                        ))
                       }
                    </InPageNavigation>

                </div>

                {/* filters and trending blogs */}
                <div className="min-w-[40%] lg:max-w-[200px] max-w-min border-l border-emerald-400 pl-10 pt-3 max-md:hidden">

                    <div className="flex flex-col gap-5">

                        <h1 className="font-medium text-xl ">Find Your Next Read !</h1>

                        <div className="flex gap-3 flex-wrap mb-5">

                            {
                                categories.map((category, index) => (
                                    <button key={index} className={`px-4 py-2 text-emerald-700 font-semibold rounded-full hover:bg-emerald-200 transition ${pageState === category.toLocaleLowerCase() ? "bg-slate-700 text-white" : "bg-slate-300"}`}
                                            onClick={loadBlogByCategory}>
                                        {category}
                                    </button>
                                ))
                            }

                        </div>

                    <div>
                        <h1 className="font-medium text-xl mb-8">
                            Trending <i className="fi fi-rr-arrow-trend-up text-emerald-500"></i>
                        </h1>
                    </div>
                    { trendingBlogs.length == 0 ? <NoDataMessage message={"No trending blogs found !"}/>
                        :
                        trendingBlogs.map((blog, index) => (
                            <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />

                            </AnimationWrapper>
                        ))
                       }
                </div>
               </div> 
            </section>
        </AnimationWrapper>

    )
}

export default HomePage;