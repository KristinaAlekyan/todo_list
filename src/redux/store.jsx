import {combineReducers, configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import statusReducer from './activeStatusSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    todos: todoReducer,
    activeBtnStatus: statusReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
