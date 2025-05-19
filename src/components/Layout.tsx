import React from "react";
import ZoneForm from "./ZoneForm";
import ZoneList from "./ZoneList";
import RoomForm from "./RoomForm";
import RoomList from "./RoomList";

const Layout: React.FC = () => (
  <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
    <section>
      <h2 className="text-2xl mb-2">Zóny</h2>
      <ZoneForm />
      <ZoneList />
    </section>

    <section>
      <h2 className="text-2xl mb-2">Místnosti</h2>
      <RoomForm />
      <RoomList />
    </section>
  </div>
);

export default Layout;
