import { Outlet } from "react-router-dom";
import CartDrawer from "../cart/CartDrawer";
import SettingsPanel from "../settings/SettingsPanel";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <SettingsPanel />
        <Outlet />
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}

export default Layout;
