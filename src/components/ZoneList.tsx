import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeZone } from "../features/zones/zoneSlice";
import { updateRoom } from "../features/rooms/roomSlice";
import type { Room } from "../types/room";
import { selectZonesWithTotals } from "../features/zones/zoneSelectors";

const ZoneList: React.FC = () => {
  const dispatch = useAppDispatch();
  const zones = useAppSelector(selectZonesWithTotals);
  const rooms = useAppSelector((state) => state.rooms);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (zones.length === 0) {
    return (
      <p className="italic text-center">Žádné zóny – přidejte první výše </p>
    );
  }

  return (
    <ul className="space-y-4">
      {zones.map((z) => {
        const isOpen = z.id === expandedId;
        const zoneRooms: Room[] = rooms.filter((r) => r.zoneId === z.id);
        return (
          <li key={z.id} className="border rounded p-4 bg-white flex flex-col">
            <div
              className="cursor-pointer"
              onClick={() => setExpandedId(isOpen ? null : z.id)}
            >
              <h3 className="font-semibold text-lg">{z.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {z.totalArea} m² • {z.totalVolume} m³
              </p>
            </div>

            {isOpen && (
              <div className="mt-4 pl-4 border-l space-y-2">
                <h4 className="font-medium">Místnosti v zóně:</h4>
                {zoneRooms.length === 0 ? (
                  <p className="text-sm italic text-gray-500">
                    Žádné místnosti
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {zoneRooms.map((room) => (
                      <li
                        key={room.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{room.name}</span>
                        <button
                          onClick={() =>
                            dispatch(updateRoom({ ...room, zoneId: undefined }))
                          }
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          Odebrat
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button
              onClick={() => dispatch(removeZone(z.id))}
              className="mt-auto self-end text-sm text-red-600 hover:text-red-800"
            >
              Smazat
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ZoneList;
