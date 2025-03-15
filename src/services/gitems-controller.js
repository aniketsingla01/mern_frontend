import { publicAxios } from "./axios-config";


const doItemsFetch=(obj)=>{
    return publicAxios.post("gavail/fetch-items",obj);
}

const doItemsDelete=(obj)=>{
    return publicAxios.post("gavail/delete-items",obj);
}

export{doItemsFetch,doItemsDelete};
