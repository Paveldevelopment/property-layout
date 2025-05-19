// PAV src/features/zones/zoneSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Zone } from "../../types/zone";
import type { Room } from "../../types/room";

const selectZones = (state: RootState) => state.zones;
const selectRooms = (state: RootState) => state.rooms;

/**
 * PAV Vrátí každou zónu rozšířenou o totalArea a totalVolume
 */
export const selectZonesWithTotals = createSelector(
  [selectZones, selectRooms],
  (zones: Zone[], rooms: Room[]) => {
    return zones.map((zone) => {
      const zoneRooms = rooms.filter((r) => r.zoneId === zone.id);
      const totalArea = zoneRooms.reduce((sum, r) => sum + r.area, 0);
      const totalVolume = zoneRooms.reduce((sum, r) => sum + r.volume, 0);
      return { ...zone, totalArea, totalVolume };
    });
  }
);
