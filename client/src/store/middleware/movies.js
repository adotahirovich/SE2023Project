import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    moviesRequested: (movies, action) => {
      movies.loading = true;
    },
    moviesReceived: (movies, action) => {
      movies.list = action.payload;
      movies.loading = false;
    },
    moviesRequestFailed: (movies, action) => {
      movies.loading = false;
    },
  },
});

export default slice.reducer;

const { moviesRequested, moviesReceived, moviesRequestFailed } = slice.actions;

const url = ""; // ova linije mozda nije ok!

export const loadMovies = (searchInput) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      searchInput: searchInput,
      onStart: moviesRequested.type,
      onSuccess: moviesReceived.type,
      onError: moviesRequestFailed.type,
    })
  );
};
