import { publicAxios } from "./axios-config";

const doFetchgrower=(obj)=>{
    return publicAxios.post("gavail/find-grower",obj);
}

const doFetchProfile=(obj)=>{
    return publicAxios.post("gavail/find-grower/details",obj);
}

export{doFetchgrower, doFetchProfile};