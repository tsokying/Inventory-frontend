import { GET_USERS, GET_USER, DELETE_USER } from "../actions/types";

const initalState = {
    users: [],
    user: {},
};

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: action.payload };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };

        default:
            return state;
    }
}
