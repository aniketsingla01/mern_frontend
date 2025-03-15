import { privateReq, publicAxios } from "./axios-config";

const doSaveProfile = (profileData) => {
    return publicAxios.post("gprofile/create-profile", profileData);
}

const doFetchProfile = (email) => {
    return publicAxios.get("gprofile/fetch-profile?email=" + email);
}

const doUpdateProfile = (profileData) => {
    return publicAxios.post("gprofile/update-profile", profileData);
}

const doFetchProfileandValidateToken = (email) => {
    //alert(email);
    return privateReq.get("gprofile/fetch-profile-validate-token?email=" + email)
}


export { doSaveProfile, doFetchProfile, doUpdateProfile, doFetchProfileandValidateToken };

