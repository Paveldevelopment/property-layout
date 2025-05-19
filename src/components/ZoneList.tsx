import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeZone } from "../features/zones/zoneSlice";
import ZoneDetailModal from "./ZoneDetailModal";
import { selectZonesWithTotals } from "../features/zones/zoneSelectors";
import type { Zone } from "../types/zone";

const ZoneList: React.FC = () => {
  const dispatch = useAppDispatch();
  const zonesWithTotals = useAppSelector(selectZonesWithTotals);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  if (zonesWithTotals.length === 0) {
    return <p>Žádné zóny</p>;
  }

  return (
    <>
      <ul>
        {zonesWithTotals.map((z) => (
          <li key={z.id}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setSelectedZone(z)}
            >
              {z.name} – plocha: {z.totalArea}, objem: {z.totalVolume}
            </span>
            <button
              onClick={() => dispatch(removeZone(z.id))}
              aria-label="Smazat zónu"
            >
              🗑️
            </button>
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
