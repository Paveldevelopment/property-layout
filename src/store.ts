import { configureStore } from "@reduxjs/toolkit";
import zonesReducer from "./features/zones/zoneSlice";
import roomsReducer from "./features/rooms/roomSlice";

const store = configureStore({
  reducer: {
    zones: zonesReducer,
    rooms: roomsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // PAV return type explain?

export default store;
