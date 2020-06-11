import axios from "axios";
import { GET_ERRORS, GET_STOCKS, GET_STOCK, DELETE_STOCK } from "./types";

export const addStock = (task, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/stock", stock);
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

export const getAllStock = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8080/api/stock/all");
    dispatch({
        type: GET_STOCKS,
        payload: res.data,
    });
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

export const getStock = (stock_id, history) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/stock/${stock_id}`
        );
        dispatch({
            type: GET_STOCK,
            payload: res.data,
        });
    } catch (error) {
        history.push("/");
    }
};