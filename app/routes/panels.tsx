import { Outlet } from "@remix-run/react";

export default function PanelsRoute() {
  return (
    <div>
      <h1 className="text-3xl text-white">PANELS (づ｡◕‿‿◕｡)づ</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}