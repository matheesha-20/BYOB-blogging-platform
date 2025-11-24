import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component.jsx";
import { set } from "mongoose";

export const blogStructure = {
    title: "",
    banner: "",
    author: {
        personal_info: {
            profile_img: "",
            username: ""
        }
    },
    createdAt: "",
    date: "",
    des: "",
    activity: {
        total_likes: 0,
        total_reads: 0,
        total_comments: 0

    },
    content: []
};

export const BlogContext = createContext({});

const BlogPage = () => {

    let { blog_id } = useParams();
    let [blogData, setBlogData] = useState(blogStructure);
    let [loading, setLoading] = useState(true);

    const [ similarBlogs, setSimilarBlogs ] = useState([]);

    let { title, banner, author:{ personal_info: { profile_img, username: author_username } }, publishedAt, des, tags, content, activity} = blogData;

    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
        .then(({ data }) => {
            
            setBlogData(data.blog);

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: data.blog.tags[0], limit: 5, eliminate_blog: blog_id })
            .then(({ data: { blogs } }) => {
                setSimilarBlogs(blogs);
            })
            .catch(err => {
                console.error(err);
            });

            
            setLoading(false);
            
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }

    useEffect(() => {
        resetState();
        fetchBlog();
    }, [blog_id]);

    const resetState = () => {
        setBlogData(blogStructure);
        setLoading(true);
        setSimilarBlogs([]);
    }

    return (
        <AnimationWrapper>
            {loading ? <Loader /> : 
            
            <BlogContext.Provider value={{ blogData, setBlogData }}>
                <div className="max-w-8xl mx-auto p-6">
            <article className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1">
                <div className="md:col-span-1 relative">
                    <img
                        className="h-full w-auto object-cover"
                        src={banner || "https://via.placeholder.com/800x600?text=No+Image"}
                        alt={title ?? "Blog image"}
                    />
                    <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {new Date(publishedAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>

                <div className="md:col-span-2 p-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-500 leading-tight">
                            {title ?? "Untitled post"}
                        </h2>

                        <div className="mt-4 flex items-center text-m text-gray-500 dark:text-gray-400 gap-3">
                            <span className="flex items-center gap-2">
                                <img
                                    src={profile_img}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span><span className="text-emerald-500">@</span><Link to={`/user/${author_username}`}>{author_username ?? "Unknown author"}</Link></span>
                            </span>
                        </div>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {des ?? "No description available."}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-10 items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {(tags || []).map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 bg-slate-300 text-emerald-700 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                                </div>

                                
                                 

                        </div>
                        <div className=" mt-5 flex flex-wrap justify-between items-center">
                             <BlogInteraction />
                        </div>
                       
                        <div className="mt-5">
                            {/* <p>
                                {content.map((block, index) => {
                                    if (block.type === "paragraph") {
                                        return <p key={index} className="mb-4">{block.data}</p>;
                                    } else if (block.type === "heading") {
                                        return <h3 key={index} className="text-xl font-semibold mb-4">{block.data}</h3>;
                                    } else if (block.type === "image") {
                                        return <img key={index} src={block.data} alt={`Blog image ${index}`} className="my-4 w-full rounded" />;
                                    } else if (block.type === "list") {
                                        return (
                                            <ul key={index} className="list-disc list-inside mb-4">
                                                {block.data.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                })}
                            </p> */}

                        </div>

                        <div className=" mt-5 flex flex-wrap justify-between items-center">
                             <BlogInteraction />
                        </div> 


            {
                similarBlogs.length > 0 ?
                <>
                 <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Similar Blogs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {similarBlogs.map((blog, index) => (
                        // <Link to={`/blog/${blog.blog_id}`} key={index} className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        //     <img src={blog.banner} alt={blog.title} className="w-full h-40 object-cover" />
                        //     <p className="p-3">{blog.title}</p>
                        // </Link>

                        <AnimationWrapper transition={{ duration: 1, delay: index* 0.08}} key={index}>
                        <BlogPostCard content={blog} author={blog.author.personal_info} key={index} />
                        </AnimationWrapper>

                    ))}
                </div>
            </div>
             </>
            : null
            }
                   
                           
                       
                        

                       </div>  
                   
                </div>
            </article>
                </div>
                </BlogContext.Provider>
            
        }
        </AnimationWrapper>
            
        
    );
}

export default BlogPage;