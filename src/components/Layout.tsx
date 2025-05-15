// src/components/Layout.tsx
import React from "react";
import ZoneList from "./ZoneList";
import RoomList from "./RoomList";

const Layout: React.FC = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
    <section>
      <h2>Zóny</h2>
      <ZoneList />
    </section>
    <section>
      <h2>Místnosti</h2>
      <RoomList />
    </section>
  </div>
);

export default Layout;
