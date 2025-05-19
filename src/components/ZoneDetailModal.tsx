import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateRoom } from "../features/rooms/roomSlice";
import type { Zone } from "../types/zone";
import type { Room } from "../types/room";

interface ZoneDetailModalProps {
  zone: Zone;
  onClose: () => void;
}

const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({ zone, onClose }) => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms).filter(
    (room: Room) => room.zoneId === zone.id
  );

  const handleUnassign = (room: Room) => {
    dispatch(updateRoom({ ...room, zoneId: undefined }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Místnosti ve zóně: {zone.name}</h3>
        {rooms.length === 0 ? (
          <p>Žádné místnosti</p>
        ) : (
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                {room.name}{" "}
                <button onClick={() => handleUnassign(room)}>Odebrat</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Zavřít</button>
      </div>
    </div>
  );
};

export default ZoneDetailModal;
