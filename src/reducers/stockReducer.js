import { GET_STOCKS, GET_STOCK, DELETE_STOCK } from "../actions/types";

const initalState = {
    stocks: [],
    stock: {},
};

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_STOCKS:
            return { ...state, stocks: action.payload };

        case GET_STOCK:
            return {
                ...state,
                stock: action.payload,
            };

        case DELETE_STOCK:
            return {
                ...state,
                stocks: state.stocks.filter((stock) => stock.id !== action.payload),
            };

        default:
            return state;
    }
}
