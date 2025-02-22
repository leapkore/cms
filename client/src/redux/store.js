import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist"; // ✅ Corrected import
import storage from "redux-persist/lib/storage"; // ✅ LocalStorage engine

const persistConfig = {
  key: "root",
  storage, // ✅ Pass storage here
  version: 1,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // ✅ Correct usage

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Avoids serialization warnings
    }),
});

export const persistor = persistStore(store);
