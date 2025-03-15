import { privateReq, publicAxios } from "./axios-config";

const doSaveProfile = (cprofileData) => {
    return publicAxios.post("cprofile/profile-creation", cprofileData);
}

const doUpdateCProfile = (cprofileData) => {
    return publicAxios.post("cprofile/profile-updation", cprofileData);
}

const doFetchCProfileandValidateToken = (email) => {
    return privateReq.get("cprofile/fetch-cprofile-validate-token?email=" + email);
}

export { doSaveProfile, doUpdateCProfile, doFetchCProfileandValidateToken };