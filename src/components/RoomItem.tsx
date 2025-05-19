import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateRoom } from "../features/rooms/roomSlice";

// Správné importy typů:
import type { Room } from "../types/room";
import type { Zone } from "../types/zone";

interface Props {
  room: Room;
}

const RoomItem: React.FC<Props> = ({ room }) => {
  const dispatch = useAppDispatch();
  const zones = useAppSelector((state) => state.zones);

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateRoom({ ...room, zoneId: e.target.value || undefined }));
  };

  return (
    <li>
      <strong>{room.name}</strong> – plocha: {room.area}, objem: {room.volume}
      <select value={room.zoneId ?? ""} onChange={handleZoneChange}>
        <option value="">(Nezařazeno)</option>
        {zones.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>
    </li>
  );
};

export default RoomItem;
