import { publicAxios } from "./axios-config";

const doAvail=(availproduct)=>{
    return publicAxios.post("gavail/avail-product",availproduct);
}

export{doAvail};

