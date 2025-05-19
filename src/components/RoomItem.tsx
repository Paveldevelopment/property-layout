import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateRoom, removeRoom } from "../features/rooms/roomSlice";
import type { Room } from "../types/room";

const RoomItem: React.FC<{ room: Room }> = ({ room }) => {
  const dispatch = useAppDispatch();
  const zones = useAppSelector((state) => state.zones);

  return (
    <>
      <div onClick={() => {}}>
        <h4 className="font-medium">{room.name}</h4>
        <p className="text-sm">
          {room.area} m² • {room.volume} m³
        </p>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <select
          value={room.zoneId ?? ""}
          onChange={(e) =>
            dispatch(
              updateRoom({ ...room, zoneId: e.target.value || undefined })
            )
          }
          className="flex-1"
        >
          <option value="">(Nezařazeno)</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
            </option>
          ))}
        </select>
        <button onClick={() => dispatch(removeRoom(room.id))}>Smazat</button>
      </div>
    </>
  );
};

export default RoomItem;
