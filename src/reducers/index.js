import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import stockReducer from "./stockReducer";
import productReducer from "./productReducer"
import locationReducer from "./locationReducer"
import userReducer from "./userReducer"
import packageReducer from "./packageReducer"

export default combineReducers({
    errorsReducer: errorsReducer,
    stockReducer: stockReducer,
    productReducer: productReducer,
    locationReducer: locationReducer,
    userReducer: userReducer,
    packageReducer: packageReducer,
});
