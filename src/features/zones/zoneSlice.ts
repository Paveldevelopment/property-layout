import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Zone } from "../../types/zone";

const initialState: Zone[] = [];

const zoneSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    addZone: (state, action: PayloadAction<Zone>) => {
      state.push(action.payload);
    },
    removeZone: (state, action: PayloadAction<string>) => {
      return state.filter((z) => z.id !== action.payload);
    },
    updateZone: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const zone = state.find((z) => z.id === action.payload.id);
      if (zone) zone.name = action.payload.name;
    },
  },
});

export const { addZone, removeZone, updateZone } = zoneSlice.actions;
export default zoneSlice.reducer;
