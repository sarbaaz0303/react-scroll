import axios from "axios";

const instance = {
    baseURL: "https://api.pexels.com/v1",
    headers: {
        Authorization:
            "563492ad6f9170000100000137cc855a2fd2468180221a16889a41c3",
    },
};

export const pexelsAPI = axios.create(instance);
