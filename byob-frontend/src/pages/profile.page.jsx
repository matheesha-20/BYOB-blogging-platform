import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import YouTube_icon from "../imgs/youtube.png";
import Twitter_icon from "../imgs/twitter.png";
import GitHub_icon from "../imgs/github.png";
import Facebook_icon from "../imgs/facebook.png";
import Instagram_icon from "../imgs/instagram.png";
import Website_icon from "../imgs/web.png";
import { Link } from "react-router-dom";
import AboutUser from "../components/about.component";
import InPageNavigation from "../components/inpage-navigation.component.jsx";
import BlogPostCard from "../components/blog-post.component.jsx";
import TrendingBlogPost from "../components/trending-blog-post.component.jsx";
import NoDataMessage from "../components/nodata.component.jsx";
import LoadMoreBtn from "../components/load-more.component.jsx";
import { filterPaginationData } from "../common/filter-pagination-data.jsx";
import PageNotFound from "./404.page.jsx";

export const profileDataStructure = {
    personal_info: {id: "",
    username: "",
    fullname: "",
    profile_img: ""},
    account_info: {total_reads: 0,
    total_posts: 0},
    social_links: {},
    joinedAt: "",
    bio: ""
};

const ProfilePage = () => {

    let { id: profileId } = useParams();

    let [profile, setProfile] = useState(profileDataStructure);

    let [ loading, setLoading ] = useState(true);

    let [ profileLoadeded, setProfileLoaded ] = useState("");

    const icons = {
    "youtube": <img src={YouTube_icon} alt="YouTube" className="w-6 h-6 inline-block mr-1" />,
    "twitter": <img src={Twitter_icon} alt="Twitter" className="w-6 h-6 inline-block mr-1" />,
    "github": <img src={GitHub_icon} alt="GitHub" className="w-6 h-6 inline-block mr-1" />,
    "facebook": <img src={Facebook_icon} alt="Facebook" className="w-6 h-6 inline-block mr-1" />,
    "instagram": <img src={Instagram_icon} alt="Instagram" className="w-6 h-6 inline-block mr-1" />,
    "website": <img src={Website_icon} alt="Website" className="w-6 h-6 inline-block mr-1" />
};


    let { personal_info: { fullname, username: profile_username, profile_img, bio}, account_info: {total_reads, total_posts}, social_links, joinedAt } = profile;

    let { userAuth: {username}} = useContext(UserContext);

    let [Blogs, setBlogs] = useState(null);

    const fetchProfileData = async (userId) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId })
            .then(response => {
                setLoading(false);
                if (response.data !== null) {
                    setProfile(response.data);
                    fetchBlogsByAuthor({ user_id: response.data._id });
                }
                
                setProfileLoaded(profileId);
                
                console.log(response.data);
                
            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
            });
    };

        const fetchBlogsByAuthor = ( { page = 1, user_id }) => {

            user_id = user_id == undefined ? Blogs.user_id : user_id;

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { author: user_id, page })
            .then(async ({ data: { blogs } }) => {
                let formatedBlogs = await filterPaginationData({
                    state: Blogs,
                    data: blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { author: user_id }
                });

                formatedBlogs.user_id = user_id;

                setBlogs(formatedBlogs);
            })
            .catch(err => {
                console.log(err.message);
            })
        }

        const resetState = () => {
            setProfileLoaded("");
        }

    useEffect(() => {

        if (profileLoadeded != profileId) {
            setBlogs(null);
        }

        if (Blogs == null){
            fetchProfileData(profileId);
            resetState();
        }

        
    }, [profileId, Blogs]);

    return (
        <AnimationWrapper>
           { loading ? <Loader /> : 
                profile_username.length ? 
            <div className="max-w-4xl mx-auto p-5 mt-20 mb-20 bg-white rounded-lg shadow-md">
                <div className="flex items-start gap-5">
                    <img src={profile_img} alt={`${fullname}'s profile`} className="w-32 h-32 rounded-full object-cover border-4 border-emerald-600" />
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{fullname}</h1>
                            <p className="text-gray-600">@{profile_username}</p>
                        </div>

                        <ul className="list-none space-x-5 flex flex-wrap mt-5">
                    {Object.entries(social_links).map(([platform, link]) => (
                        <li key={platform} className="flex items-center">
        
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:underline"
                        >
                            
                            {icons[platform]}
                        </a>
                        </li>
                    ))}
                    </ul>

                        <div className="flex items-center bg-white bg-opacity-80 rounded-full px-1 py-1 shadow self-end mt-3 gap-2">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline-block mr-1 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h6m-6 4h10M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                            />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">{total_posts}</span>
                        
                            <svg className="mr-1" fill="#66cf5e" height="20px" width="20px" viewBox="0 0 512 512" stroke="#66cf5e">
                                <g>
                                    <path d="M128,213.333c-23.531,0-42.667,19.136-42.667,42.667c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667 c0-11.755,9.579-21.333,21.333-21.333c5.888,0,10.667-4.779,10.667-10.667S133.888,213.333,128,213.333z"></path>
                                    <path d="M384,213.333c-23.531,0-42.667,19.136-42.667,42.667c0,5.888,4.779,10.667,10.667,10.667 c5.888,0,10.667-4.779,10.667-10.667c0-11.755,9.579-21.333,21.333-21.333c5.888,0,10.667-4.779,10.667-10.667 S389.888,213.333,384,213.333z"></path>
                                    <path d="M501.333,213.333H480c-4.032,0-7.723,2.283-9.536,5.888l-5.525,11.051c-10.987-34.432-42.901-59.605-80.939-59.605 c-37.077,0-68.373,23.893-80.128,56.981c-11.627-8.768-28.523-14.315-47.872-14.315s-36.245,5.547-47.872,14.315 c-11.755-33.088-43.051-56.981-80.128-56.981c-38.037,0-69.952,25.173-80.939,59.605l-5.525-11.051 c-1.813-3.605-5.504-5.888-9.536-5.888H10.667C4.779,213.333,0,218.112,0,224v21.333C0,251.221,4.779,256,10.667,256 s10.667-4.779,10.667-10.667v-10.667h4.075l7.723,15.445c1.813,3.605,5.504,5.888,9.536,5.888 c0,47.061,38.272,85.333,85.333,85.333s85.333-38.272,85.333-85.333c0-10.069,18.24-21.333,42.667-21.333 s42.667,11.264,42.667,21.333c0,47.061,38.272,85.333,85.333,85.333c47.061,0,85.333-38.272,85.333-85.333 c4.032,0,7.723-2.283,9.536-5.888l7.723-15.445h4.075v10.667c0,5.888,4.779,10.667,10.667,10.667 c5.888,0,10.667-4.779,10.667-10.667V224C512,218.112,507.221,213.333,501.333,213.333z M128,320c-35.285,0-64-28.715-64-64 s28.715-64,64-64s64,28.715,64,64S163.285,320,128,320z M384,320c-35.285,0-64-28.715-64-64s28.715-64,64-64 c35.285,0,64,28.715,64,64S419.285,320,384,320z"></path>
                                </g>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{total_reads}</span>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className="flex items-center self-end  mt-1 gap-2">
                    { profileId == username ? <Link to= "settings/edit-profile" className="mt-2 bg-slate-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-700 transition">
                        Edit Profile
                    </Link> : " " }
                    
                </div>

                    <AboutUser className=" max-md:hidden mt-10" username={profile_username} bio={bio} joinedAt={joinedAt} />
                       

                        <div className="max-md:mt-12 w-full mt-10">

                            <InPageNavigation routes={[ "Blogs Published", "About"]} defaultHidden={"About"}>

                       <>
                       {
                            Blogs == null ? <Loader /> 
                            :  Blogs.length == 0 ? <NoDataMessage message={"No blogs found !"}/>
                            :Blogs.results.map((blog, index) => (
                                <AnimationWrapper transition={{ duration: 1, delay: index*.1}} key={index}>

                                    <BlogPostCard content={blog} author={blog.author.personal_info} />

                                </AnimationWrapper>
                            ))
                               
            
                        }
                        <LoadMoreBtn state={Blogs} fetchDataFun={fetchBlogsByAuthor} />
                        
                       </>
                        

                        <AboutUser  username={profile_username} bio={bio} joinedAt={joinedAt} />
                       
                       
                    </InPageNavigation>

                        </div>
            </div>
            : <PageNotFound />
           }
        </AnimationWrapper>
    );
};

export default ProfilePage;