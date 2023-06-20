import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./movies";
import api from "./api";

export default function store() {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api],
  });
}
