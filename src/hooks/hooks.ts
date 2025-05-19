// src/hooks.ts  (nebo src/hooks/hooks.ts — cestu pak opravte v RoomList)
import { useDispatch, useSelector } from "react-redux";
// typ‐only import pro všechny typy
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
