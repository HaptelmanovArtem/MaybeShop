import Axios from 'axios';

const withAuth = Axios.create({
    baseURL: `https://localhost:44328/api/catalog`,
    headers: {
        ContentType: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

export const getAllCatalogs = async () => {
    return withAuth.get()
        .then(Response => Response)
        .catch(error => error);
}