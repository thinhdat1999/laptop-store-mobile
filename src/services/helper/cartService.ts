import AsyncStorage from "@react-native-community/async-storage";
import CartConstants from "../../values/constants/CartConstants";
import { userApi } from "../api/userApi";

import { fireFetching, fireLoading, skipFetching } from "../redux/slices/loaderStatusSlice";
import { setMessage } from "../redux/slices/messageSlice";
import store from "../redux/store";


const getCart = async (): Promise<{ [key: number]: number }> => {
    const cart =  await AsyncStorage.getItem("cart");
    return cart ? JSON.parse(cart) : {};
};

const getWishList = async (): Promise<number[]> => {
    const wishlist =  AsyncStorage.getItem("wish_list");
    return wishlist
        ? // @ts-ignore
        JSON.parse(wishlist)
        : [];
};

const getTotalQuantity = () => {
    return Object.values(getCart()).reduce((a, b) => a + b, 0);
};

const syncStorage = async (newCart: { [key: number]: number }) => {
    try {
        const cartJSON = JSON.stringify(newCart);
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
            await userApi.putCurrentUserCart(cartJSON);
            await new Promise((r) => setTimeout(r, 250));
        } else {
            await new Promise((r) => setTimeout(r, 300));
        }
        AsyncStorage.setItem("cart", cartJSON);
    } catch (err) {
        store.dispatch(setMessage(err.response));
    }
};

const addItem = async (itemId: number, value: number) => {
    store.dispatch(fireLoading());
    const cart = await getCart();
    const quantity = value + (cart?.[itemId] ?? 0);
    if (quantity <= CartConstants.MAX_QUANTITY_PER_ITEM) {
        const cart = await getCart();
        cart[itemId] = quantity;
        await syncStorage(cart);
    }
    store.dispatch(skipFetching());
};

const removeItem = async (itemId: number) => {
    store.dispatch(fireLoading());
    const cart = await getCart();
    delete cart[itemId];
    await syncStorage(cart);
    store.dispatch(fireFetching());
};

const isEmptyCart = () => {
    return Object.keys(getCart()).length === 0;
};

const moveItemToWishList = async (itemId: number) => {
    store.dispatch(fireLoading());
    try {
        await userApi.postItemFromCartToWishList(itemId);
        const cart = await getCart();
        const wishlist = await getWishList();
        delete cart[itemId];
        wishlist.unshift(itemId);
        AsyncStorage.setItem("cart", JSON.stringify(cart));
        AsyncStorage.setItem("wish_list", JSON.stringify(wishlist));
    } catch (err) {
        store.dispatch(setMessage(err.response));
    }
    store.dispatch(fireFetching());
};

export default {
    getCart,
    getTotalQuantity,
    syncStorage,
    addItem,
    removeItem,
    isEmptyCart,
    moveItemToWishList,
};