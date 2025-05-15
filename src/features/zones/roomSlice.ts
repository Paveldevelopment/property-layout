import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../types/room";

const initialState: Room[] = [];

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<Room>) => {
      state.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<string>) => {
      return state.filter((r) => r.id !== action.payload);
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const idx = state.findIndex((r) => r.id === action.payload.id); // PAV proc findIndex misto find?
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { addRoom, removeRoom, updateRoom } = roomSlice.actions;
export default roomSlice.reducer;
