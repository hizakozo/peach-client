import Axios from "axios";
import auth from "@react-native-firebase/auth";

const baseURL = "http://10.0.2.2:8080/v1"

export const instance = Axios.create({
    baseURL: baseURL,
    timeout: 20000,
})

instance.interceptors.request.use(async function (config) {
    config.headers['authorization'] = await auth().currentUser?.getIdToken()
    return config;
}, function (error) {
    return Promise.reject(error);
});