import axios from "axios";

// const baseURL = "http://localhost:2010/";

const baseURL= "https://mern-project-bat3.onrender.com";

const publicAxios = axios.create({ baseURL });

const privateReq = axios.create({ baseURL });

privateReq.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization= `Bearer ${token}`;
    }
    else
    {
        console.log("Token Not Recieved");
    }
    return config;
});

export { publicAxios, baseURL, privateReq };

