import React from "react";
import { useAppSelector } from "../hooks/hooks";

import RoomItem from "./RoomItem";

const RoomList: React.FC = () => {
  // teď state.rooms už má typ Room[]
  const rooms = useAppSelector((state) => state.rooms);

  if (rooms.length === 0) {
    return <p>Žádné místnosti</p>;
  }

  return (
    <ul>
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </ul>
  );
};

export default RoomList;
