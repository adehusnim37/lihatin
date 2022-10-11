class TokenService {
    getLocalRefreshToken() {
        const data = JSON.parse(localStorage.getItem('token'));
        return data?.refreshToken;
    }

    getLocalAccessToken() {
        const data = JSON.parse(localStorage.getItem('token'));
        return data?.token;
    }

    updateLocalAccessToken(token) {
        let data = JSON.parse(localStorage.getItem('token'));
        data.token = token;
        localStorage.setItem("token", JSON.stringify(data));
    }

    getLocalEmail() {
        const data = JSON.parse(localStorage.getItem('token'));
        return data?.email;
    }
}

export default new TokenService();