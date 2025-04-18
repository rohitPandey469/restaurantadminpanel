import Cookies from "js-cookie"

export const storeToken = (key, value) => {
    if(typeof window === "undefined") {
        return
    }
    Cookies.set(key, value, { secure: true, sameSite: "strict" });
}

export const removeToken = (key) =>{
    if(typeof window === "undefined") {
        return
    }
    Cookies.remove(key);
}

export const getToken = (key) => {
    if(typeof window === "undefined") {
        return
    }
    return Cookies.get(key) || null;
}