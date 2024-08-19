import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRating } from "../../interfaces/IRating";
export interface RatingState {
  rating: null | IRating[];
  loading: boolean;
  error: null | string;
}
const initialState: RatingState = {
  rating: null,
  error: null,
  loading: false,
};
const globalRatingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    ratingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    ratingSuccess: (state, action: PayloadAction<IRating[]>) => {
      state.loading = false;
      state.rating = action.payload;
      state.error = null;
    },
    ratingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { ratingFailure, ratingRequest, ratingSuccess } =
  globalRatingSlice.actions;
export default globalRatingSlice.reducer;
