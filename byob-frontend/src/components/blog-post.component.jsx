import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {

    let { title, banner, des, tags, publishedAt, activity: { total_likes }, blog_id: id } = content;
    let { username, fullname, profile_img } = author;

    return (
        
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5 relative">
                
                <img src={banner} alt={title} className="w-full h-96 object-cover" />
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
                                <Link to={"/profile/" + username}>
                                    <span className="text-green-600 text-base align-middle">@</span>
                                    {username}
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600">{new Date(publishedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center bg-white bg-opacity-80 rounded-full px-3 py-1 shadow">
                    <svg className="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{total_likes}</span>
                </div>
            </div>
    )
}

export default BlogPostCard;