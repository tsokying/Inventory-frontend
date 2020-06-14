import axios from "axios";
import { GET_ERRORS, GET_LOCATIONS, GET_LOCATION, DELETE_LOCATION } from "./types";

export const addLocation = (location, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/location", location);
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

export const getAllLocation = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8080/api/location/all");
    dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
    });
};

export const getLocation = (location_id, history) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/location_id/${location_id}`
        );
        dispatch({
            type: GET_LOCATION,
            payload: res.data,
        });
    } catch (error) {
        history.push("/");
    }
};

export const deleteLocation = (location_id) => async (dispatch) => {
    if (window.confirm("This action cannot be undone.")) {
        await axios.delete(`http://localhost:8080/api/location_id/${location_id}`);
        dispatch({
            type: DELETE_LOCATION,
            payload: location_id,
        });
    } else {
    }
};
