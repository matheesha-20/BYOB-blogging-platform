import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {

    let { title, banner, des, tags, publishedAt, activity: { total_likes, total_reads }, blog_id: id } = content;
    let { username, fullname, profile_img } = author;
    

    return (
        
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5 relative">
                <Link to={"/blog/" + id}><img src={banner} alt={title} className="w-full h-96 object-cover" />
                </Link>
                <div className="p-4">
                    <h2 className="text-xl font-semibold"><Link to={"/blog/" + id}>{title}</Link></h2>
                    <p className="text-gray-600 line-clamp-2 md:max-[1100px]:hidden max-sm:hidden">{des}</p>
                    <div className="mt-2">
                        {tags.map(tag => (
                            <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center">
                        <img src={profile_img} alt={username} className="w-10 h-10 rounded-full mr-2" />
                        <div>
                            <p className="text-base font-bold">
                                <Link to={`/user/${username}`}>
                                    <span className="text-green-600 text-base align-middle">@</span>
                                    {username}
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600">{new Date(publishedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center bg-white bg-opacity-80 rounded-full px-3 py-1 shadow gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{total_likes}</span>
                <svg className="w-6 h-6" fill="#66cf5e" height="20px" width="20px" viewBox="0 0 512 512" stroke="#66cf5e">
                        <g>
                            <path d="M128,213.333c-23.531,0-42.667,19.136-42.667,42.667c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667 c0-11.755,9.579-21.333,21.333-21.333c5.888,0,10.667-4.779,10.667-10.667S133.888,213.333,128,213.333z"></path>
                            <path d="M384,213.333c-23.531,0-42.667,19.136-42.667,42.667c0,5.888,4.779,10.667,10.667,10.667 c5.888,0,10.667-4.779,10.667-10.667c0-11.755,9.579-21.333,21.333-21.333c5.888,0,10.667-4.779,10.667-10.667 S389.888,213.333,384,213.333z"></path>
                            <path d="M501.333,213.333H480c-4.032,0-7.723,2.283-9.536,5.888l-5.525,11.051c-10.987-34.432-42.901-59.605-80.939-59.605 c-37.077,0-68.373,23.893-80.128,56.981c-11.627-8.768-28.523-14.315-47.872-14.315s-36.245,5.547-47.872,14.315 c-11.755-33.088-43.051-56.981-80.128-56.981c-38.037,0-69.952,25.173-80.939,59.605l-5.525-11.051 c-1.813-3.605-5.504-5.888-9.536-5.888H10.667C4.779,213.333,0,218.112,0,224v21.333C0,251.221,4.779,256,10.667,256 s10.667-4.779,10.667-10.667v-10.667h4.075l7.723,15.445c1.813,3.605,5.504,5.888,9.536,5.888 c0,47.061,38.272,85.333,85.333,85.333s85.333-38.272,85.333-85.333c0-10.069,18.24-21.333,42.667-21.333 s42.667,11.264,42.667,21.333c0,47.061,38.272,85.333,85.333,85.333c47.061,0,85.333-38.272,85.333-85.333 c4.032,0,7.723-2.283,9.536-5.888l7.723-15.445h4.075v10.667c0,5.888,4.779,10.667,10.667,10.667 c5.888,0,10.667-4.779,10.667-10.667V224C512,218.112,507.221,213.333,501.333,213.333z M128,320c-35.285,0-64-28.715-64-64 s28.715-64,64-64s64,28.715,64,64S163.285,320,128,320z M384,320c-35.285,0-64-28.715-64-64s28.715-64,64-64 c35.285,0,64,28.715,64,64S419.285,320,384,320z"></path>
                        </g>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{total_reads}</span>
                </div>
            </div>
    )
}

export default BlogPostCard;