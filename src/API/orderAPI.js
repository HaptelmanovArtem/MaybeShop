import Axios from 'axios';

export const getAllOrders = async () => {
    return Axios.get(`https://localhost:44328/api/order`,{
        headers: {
            ContentType: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(Response=>Response)
        .catch(error=>error);
}

export const getAllOrdersByUserId = async (id) => {
    return Axios.get(`https://localhost:44328/api/order/getmyorders/${id}`,{
        headers: {
            ContentType: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(Response=>Response)
        .catch(error=>error);
}

export const deleteOrderById = async (id) => {
    return Axios.delete(`https://localhost:44328/api/order/${id}`,{
        headers:{
            ContentType: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(Response=>Response)
        .catch(error=>error);
}

export const changeInfoInOrderById = async (id, changedOrder) => {
    return Axios.put(`https://localhost:44328/api/order/${id}`, changedOrder,{
                headers:{
                    ContentType: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(Response=>Response)
            .catch(error=>error);
}