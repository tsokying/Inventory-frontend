import axios from "axios";
import { GET_ERRORS, GET_STOCKS, GET_STOCK, DELETE_STOCK } from "./types";

export const addStock = (stock) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock", stock);
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

export const uploadStock = (file, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock/upload", file);
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
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
};

export const deleteStock = (stock_id, history) => async (dispatch) => {
    if (window.confirm("This action cannot be undone.")) {
        await axios.delete(`http://localhost:8080/api/stock/${stock_id}`);
        history.push("/");
        dispatch({
            type: DELETE_STOCK,
            payload: stock_id,
        });
    } else {
    }
};
