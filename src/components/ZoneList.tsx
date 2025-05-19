import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import ZoneDetailModal from "./ZoneDetailModal";
import type { Zone } from "../types/zone";

const ZoneList: React.FC = () => {
  const zones = useAppSelector((state) => state.zones);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  if (zones.length === 0) {
    return <p>Žádné zóny</p>;
  }

  return (
    <>
      <ul>
        {zones.map((z) => (
          <li key={z.id}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setSelectedZone(z)}
            >
              {z.name}
            </span>
          </li>
        ))}
      </ul>

      {selectedZone && (
        <ZoneDetailModal
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}
    </>
  );
};

export default ZoneList;
