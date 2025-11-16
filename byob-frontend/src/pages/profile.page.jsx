import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";

export const profileDataStructure = {
    personal_info: {id: "",
    username: "",
    fullname: "",
    profile_img: ""},
    account_info: {total_reads: 0,
    total_blogs: 0},
    social_links: {},
    joinedAt: ""
};

const ProfilePage = () => {

    let { id: profileId } = useParams();

    let [profile, setProfile] = useState(profileDataStructure);

    let [ loading, setLoading ] = useState(true);


    let { personal_info: { fullname, username: profile_username, profile_img, bio}, account_info: {total_reads, total_blogs}, social_links, joinedAt } = profile;

    const fetchProfileData = async (userId) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId })
            .then(response => {
                setLoading(false);
                setProfile(response.data);
            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
            });
    };

    useEffect(() => {
        fetchProfileData(profileId);
    }, [profileId]);

    return (
        <AnimationWrapper>
           { loading ? <Loader /> : 
            <div className="profile-page-container">
                <div className="profile-header">
                    <img src={profile_img} alt={`${fullname}'s profile`} className="profile-image" />
                    <h1 className="profile-fullname">{fullname}</h1>
                    <h2 className="profile-username">@{profile_username}</h2>
                </div>
            </div>}
            <h1>{profileId}</h1>
        </AnimationWrapper>
    );
};

export default ProfilePage;