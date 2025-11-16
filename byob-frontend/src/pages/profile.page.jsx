import { useParams } from "react-router-dom";

const ProfilePage = () => {

    let { id: profileId } = useParams();

    return (
        <div>
            <h1>{profileId}</h1>
        </div>
    );
};

export default ProfilePage;