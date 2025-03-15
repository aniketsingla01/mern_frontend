import { publicAxios } from "./axios-config";

const doSingup=(obj)=>{
    return publicAxios.post("signup/save-profile",obj);
}

const doCheck = (email) => {
    return publicAxios.get("signup/check-email", {
        params: { email: email }
    });
};


export{doSingup, doCheck};