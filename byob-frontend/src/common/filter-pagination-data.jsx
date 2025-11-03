import axios from "axios";

export const filterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send = { } }) => {
    
    let obj = { results: [], page: 1, docscount: 0 };

    if (state !== null && !create_new_arr) {
        obj = { ...state, results: [ ...state.results, ...data ], page: page, docscount: state.docscount };
    } else {
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send)
        .then(({ data: { docscount } }) => {
            obj= { results: data, page: 1, docscount}
        })
        .catch(err => {
            console.log(err);
        });
    }

    return obj;
}