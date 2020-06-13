import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import stockReducer from "./stockReducer";
import productReducer from "./productReducer"
import locationReducer from "./locationReducer"
import userReducer from "./userReducer"
import packageReducer from "./packageReducer"

export default combineReducers({
    errorReducer: errorReducer,
    stockReducer: stockReducer,
    productReducer: productReducer,
    locationReducer: locationReducer,
    userReducer: userReducer,
    packageReducer: packageReducer,
});
