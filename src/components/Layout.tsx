import React from "react";
import ZoneList from "./ZoneList";
import RoomList from "./RoomList";
import RoomForm from "./RoomForm";
import ZoneForm from "./ZoneForm";

const Layout: React.FC = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
    <section>
      <h2>Zóny</h2>
      <ZoneForm />
      <ZoneList />
    </section>
    <section>
      <h2>Místnosti</h2>
      <RoomForm />
      <RoomList />
    </section>
  </div>
);

export default Layout;
