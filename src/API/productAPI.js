import Axios from 'axios';

const withLogin = Axios.create({
    baseURL: `https://localhost:44328/api/phone`,
    headers: {
        ContentType: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})

export const getAllProducts = async () => {
    return withLogin.get()
        .then(Response=>Response)
        .catch(error=>error);
}

export const getProductByCatalogId = async (id) => {
    return Axios.get(`https://localhost:44328/api/phone/bycatalog/${id}`)
    .then(Response=>Response)
    .catch(error=>error);
}

export const deleteProductById = async (id) => {
    return Axios.delete(`https://localhost:44328/api/phone/${id}`,{
        headers: {
            ContentType: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(Response=>Response)
    .catch(error=>error);
}

export const addNewProduct = async (newPhone) => {
    return Axios.post(`https://localhost:44328/api/phone`, newPhone, {
        headers: {
            ContentType: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(Response=>Response)
    .catch(error=>error);
}

// export const 