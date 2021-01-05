import axios from "axios";

const instance = {
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: "Client-ID Nx29FGEJvUsUuymEBnno9x3bEfq1WC6uiB61wXfk_K0",
    },
    params: {
        order_by: "latest",
    },
};

export const unsplashAPI = axios.create(instance);
