import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeZone } from "../features/zones/zoneSlice";
import { selectZonesWithTotals } from "../features/zones/zoneSelectors";
import type { Zone } from "../types/zone";
import ZoneDetailModal from "./ZoneDetailModal";

const ZoneList: React.FC = () => {
  const dispatch = useAppDispatch();
  const zones = useAppSelector(selectZonesWithTotals);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  if (zones.length === 0) {
    return (
      <p className="italic text-center">Žádné zóny – přidejte první výše </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone) => (
          <li
            key={zone.id}
            className="border rounded p-4 bg-white flex flex-col justify-between"
          >
            <div
              className="cursor-pointer"
              onClick={() => setSelectedZone(zone)}
            >
              <h3 className="font-semibold text-lg">{zone.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {zone.totalArea} m² • {zone.totalVolume} m³
              </p>
            </div>
            <button
              onClick={() => dispatch(removeZone(zone.id))}
              className="mt-4 self-end text-sm text-red-600 hover:text-red-800"
            >
              Smazat
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
