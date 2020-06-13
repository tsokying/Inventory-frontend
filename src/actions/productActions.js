import axios from "axios";
import { GET_ERRORS, GET_PRODUCTS, GET_PRODUCT, DELETE_PRODUCT } from "./types";

export const addProduct = (product, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock", product);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
};

export const uploadProduct = () => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/product/upload");
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
}

export const getAllProduct = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8080/api/product/all");
    dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
    });
};

export const getProduct = (product_id, history) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/product/${product_id}`
        );
        dispatch({
            type: GET_PRODUCT,
            payload: res.data,
        });
    } catch (error) {
        history.push("/");
    }
};

export const deleteStock = (product_id) => async (dispatch) => {
    if (window.confirm("This action cannot be undone.")) {
        await axios.delete(`http://localhost:8080/api/product/${product_id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: stock_id,
        });
    } else {
    }
};

