import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}`,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/login" && originalConfig.url !== "/register" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const res = await instance.post("/auth/refresh-token", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                        email: TokenService.getLocalEmail(),
                    });

                    const token = res.data.data.token;
                    TokenService.updateLocalAccessToken(token);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;