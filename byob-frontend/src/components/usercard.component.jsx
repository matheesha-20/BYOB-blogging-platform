import { Link } from "react-router-dom";

const UserCard = ({ user }) => {

    let { personal_info: { fullname, username, profilePicture } } = user;

    return (
        <Link to={`/user/${username}`} className="bg-white rounded-lg shadow-md overflow-hidden mb-5 flex items-center gap-5 p-4 hover:bg-gray-100 transition-all duration-300">
            <img src={profilePicture} alt={fullname} className="w-12 h-12 rounded-full" />
            <div>
                <p className="text-lg font-semibold"><span className="text-green-600 text-base align-middle">@</span>
                    {username}
                </p>
                <p className="text-gray-600">{fullname}</p>
            </div>
        </Link>
    );
}

export default UserCard;