import { GET_PRODUCTS, GET_PRODUCT, DELETE_PRODUCT } from "../actions/types";

const initalState = {
    products: [],
    product: {},
};

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, products: action.payload };

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
            };

        default:
            return state;
    }
}
