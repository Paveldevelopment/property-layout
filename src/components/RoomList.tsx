import React from "react";
import { useAppSelector } from "../hooks/hooks";
import RoomItem from "./RoomItem";

const RoomList: React.FC = () => {
  const rooms = useAppSelector((state) => state.rooms);

  if (rooms.length === 0) {
    return (
      <p className="italic text-center">Žádné místnosti – přidejte výše </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="border rounded p-4 flex flex-col justify-between"
        >
          <RoomItem room={room} />
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
