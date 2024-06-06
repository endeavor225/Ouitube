import { combineReducers, legacy_createStore as createStore } from "redux";
import { storageReducers } from "./redux/reducers/storageReducers";
import { devToolsEnhancer } from "redux-devtools-extension";


const rootReducer = combineReducers({
    storage: storageReducers
})

const store = createStore(rootReducer, devToolsEnhancer({}))

export default store