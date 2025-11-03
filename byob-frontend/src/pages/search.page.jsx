import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component.jsx";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component.jsx";
import BlogPostCard from "../components/blog-post.component.jsx";
import AnimationWrapper from "../common/page-animation.jsx";
import NoDataMessage from "../components/nodata.component.jsx";
import LoadMoreBtn from "../components/load-more.component.jsx";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data.jsx";

const SearchPage = () => {

    let { query } = useParams();
    let [ Blogs, setBlogs ] = useState({ results: [] });



    const searchBlogs = ( {page=1, create_new_arr = false}) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
        .then(async ({ data: { blogs } }) => {
        
                    let formatedBlogs = await filterPaginationData({
                        state: Blogs,
                        data: blogs,
                        page,
                        countRoute: "/search-blogs-count",
                        data_to_send: { query },
                        create_new_arr
                    });
                    setBlogs(formatedBlogs);
                })
                .catch(err => {
                    console.log(err);
        });
    }

    const resetState = () => {
        setBlogs({ results: [] });
    }

    useEffect(() => {
        resetState();
        searchBlogs({ page: 1, create_new_arr: true });
    }, [query]);

    return (
       <section className="h-cover flex justify-center gap-10 pl-10 pr-5">
            <div className="w-full">
                <InPageNavigation routes={[`Search Results for - ${query}`, "Accounts"]} defaultHidden={["Accounts"]}>

                    <>
                        {
                            Blogs == null ? <Loader /> 
                            :  Blogs.results.length == 0 ? <NoDataMessage message={"No blogs found !"}/>
                            :Blogs.results.map((blog, index) => (
                                <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                    <BlogPostCard content={blog} author={blog.author.personal_info} />

                                </AnimationWrapper>
                            ))
                               
            
                        }
                        <LoadMoreBtn state={Blogs} fetchDatafun={() => searchBlogs({ page: Blogs.page + 1 })} />
                    
                    </>

                </InPageNavigation>

            </div>

       </section>
    );
};
export default SearchPage;