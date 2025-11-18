const AboutUser = ({className, username, bio, joinedAt}) => {
    return (
        <div className={"bg-white p-6 rounded-lg shadow-md mt-10 " + className}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-600">About {username}</h1>
            <p className="text-gray-700 mb-4 font-italic leading-relaxed">
                {bio.length ? bio : "This user has not added a bio yet."}
            </p>
            <p className="text-gray-700 mb-4 font-semibold text-right">
                {`Joined on ${new Date(joinedAt).toLocaleDateString()}`}
            </p>
        </div>
    );
};

export default AboutUser;