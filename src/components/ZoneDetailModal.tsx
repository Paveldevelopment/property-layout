import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateRoom } from "../features/rooms/roomSlice";
import type { Zone } from "../types/zone";

const ZoneDetailModal: React.FC<{ zone: Zone; onClose: () => void }> = ({
  zone,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms).filter(
    (r) => r.zoneId === zone.id
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Místnosti v zóně: {zone.name}
        </h3>
        <ul className="space-y-2 mb-4">
          {rooms.length === 0 ? (
            <p className="text-gray-500">Žádné místnosti</p>
          ) : (
            rooms.map((room) => (
              <li key={room.id} className="flex justify-between">
                <span>{room.name}</span>
                <button
                  onClick={() =>
                    dispatch(updateRoom({ ...room, zoneId: undefined }))
                  }
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Odebrat
                </button>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Zavřít
        </button>
      </div>
    </div>
  );
};

export default ZoneDetailModal;
