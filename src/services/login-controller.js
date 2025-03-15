import { publicAxios } from "./axios-config";

const doLogin = async (obj) => {
    try {
        const response = await publicAxios.get(`signup/do-login?email=${obj.email}&password=${obj.password}`);
        
        if (response.data.status === true) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
                email: obj.email,
                // Add other user data fields as needed
            }));
        }
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export { doLogin };
