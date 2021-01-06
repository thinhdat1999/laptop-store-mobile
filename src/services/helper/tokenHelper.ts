import AsyncStorage from "@react-native-community/async-storage"

const getToken = async (): Promise<string | null> => {
    const access_token  = await AsyncStorage.getItem("access_token");
    if(access_token) {
        const data = JSON.parse(access_token);``
        if(data !== null && data.expire_at && new Date(data.expire_at) < (new Date())) {
            AsyncStorage.removeItem("access_token");
            return null;
        }
        else {
            return data.access_token;
        }
    }
    return null;
}

export default {
    getToken,
}