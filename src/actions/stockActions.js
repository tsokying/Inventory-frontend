import axios from "axios";
import { GET_ERRORS, GET_STOCKS, GET_STOCK, DELETE_STOCK } from "./types";

export const addStock = (stock, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock", stock);
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
        alert("Successfully added stock.");
        history.push("/");
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
};

export const uploadStock = (file) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock/upload", file);
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
        alert("Successfully added stocks.");
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
}

export const getAllStock = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8080/api/stock/all");
    dispatch({
        type: GET_STOCKS,
        payload: res.data,
    });
};

export const getStock = (stock_id) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/stock/${stock_id}`
        );
        dispatch({
            type: GET_STOCK,
            payload: res.data,
        });
    } catch (error) {
    }
};

export const deleteStock = (stock_id) => async (dispatch) => {
    if (window.confirm("This action cannot be undone.")) {
        await axios.delete(`http://localhost:8080/api/stock/${stock_id}`);
        dispatch({
            type: DELETE_STOCK,
            payload: stock_id,
        });
    } else {
    }
};
