import React, { useEffect } from "react";
import ReactDOM from "react-dom";
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
  const roomsInZone = useAppSelector((state) => state.rooms).filter(
    (room: Room) => room.zoneId === zone.id
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "1rem",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    background: "none",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
  };

  const content = (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeButtonStyle} aria-label="Zavřít">
          ×
        </button>
        <h3 style={{ marginTop: 0 }}>Místnosti v zóně: {zone.name}</h3>
        {roomsInZone.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            Žádné místnosti v zóně
          </p>
        ) : (
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {roomsInZone.map((room) => (
              <li
                key={room.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{room.name}</span>
                <button
                  onClick={() =>
                    dispatch(updateRoom({ ...room, zoneId: undefined }))
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                  }}
                >
                  Odebrat
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ZoneDetailModal;
