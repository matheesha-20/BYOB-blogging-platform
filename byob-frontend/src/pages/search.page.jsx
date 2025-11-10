import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component.jsx";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component.jsx";
import BlogPostCard from "../components/blog-post.component.jsx";
import UserCard from "../components/usercard.component.jsx";
import AnimationWrapper from "../common/page-animation.jsx";
import NoDataMessage from "../components/nodata.component.jsx";
import LoadMoreBtn from "../components/load-more.component.jsx";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data.jsx";

const SearchPage = () => {

    let { query } = useParams();
    let [ Blogs, setBlogs ] = useState({ results: [] });
    let [ Users, setUsers ] = useState({ results: [] });



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

    const fetchUsers = () => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
        .then(async ({ data: { users } }) => {
            setUsers({ results: users });
        })
        .catch(err => {
            console.log(err);
        });
    }

    const resetState = () => {
        setBlogs({ results: [] });
        setUsers({ results: [] });
    }

    useEffect(() => {
        resetState();
        searchBlogs({ page: 1, create_new_arr: true });
        fetchUsers();
    }, [query]);

    const UserCardWrapper = () => {
        return (
            <div className="flex flex-col gap-5">
                {
                    Users == null ? <Loader />
                    : Users.results.length == 0 ? <NoDataMessage message={"No users found !"}/>
                    : Users.results.map((user, index) => (
                        <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                            <UserCard user={user} />

                        </AnimationWrapper>
                    ))
                }
            </div>
        );
    }

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

                    <UserCardWrapper />
                </InPageNavigation>

            </div>

            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l-2 border-gray-300 pl-2 pr-2 pt-3 max-md:hidden">
                <div className="flex flex-col gap-5">
                    <div className="text-xl font-semibold mb-3"><span className="underline decoration-slate-500">Search results for Users</span> <i className="fi fi-ss-user text-green-600 text-base align-middle ml-1"></i> </div>
                    <UserCardWrapper />
                </div>
            </div>

       </section>
    );
};
export default SearchPage;