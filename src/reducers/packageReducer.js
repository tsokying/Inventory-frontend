import { GET_PACKAGES, GET_PACKAGE, DELETE_PACKAGE } from "../actions/types";

const initalState = {
    packages_: [],
    package_: {},
};

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_PACKAGES:
            return { ...state, packages_: action.payload };

        case GET_PACKAGE:
            return {
                ...state,
                package_: action.payload,
            };

        case DELETE_PACKAGE:
            return {
                ...state,
                packages_: state.packages_.filter((package_) => package_.id !== action.payload),
            };

        default:
            return state;
    }
}
