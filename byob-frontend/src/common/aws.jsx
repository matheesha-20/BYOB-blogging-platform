import axios from "axios";

export const uploadImg = (img) => {

        let imgUrl = null;

        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
        .then( ({ data: { uploadURL } }) => {
            axios({
                method: 'PUT',
                url: uploadURL
            })
        } )
}