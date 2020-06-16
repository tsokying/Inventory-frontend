import axios from "axios";
import { GET_ERRORS, GET_PRODUCTS, GET_PRODUCT, DELETE_PRODUCT } from "./types";

export const addProduct = (product, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/product", product);
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
        alert("Successfully added product.");
        history.push("/")
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
};

export const uploadProduct = (file) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/product/upload", file);
        dispatch({
            type: GET_ERRORS,
            payload: {},
        }); 
        alert("Successfully added product.");
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

export const getProduct = (product_id) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/product/${product_id}`
        );
        dispatch({
            type: GET_PRODUCT,
            payload: res.data,
        });
    } catch (error) {
    }
};

export const deleteProduct = (product_id) => async (dispatch) => {
    if (window.confirm("This action cannot be undone.")) {
        await axios.delete(`http://localhost:8080/api/product/${product_id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: product_id,
        });
    } else {
    }
};

