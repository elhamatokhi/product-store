import { Outlet } from "react-router-dom";
import CartDrawer from "../cart/CartDrawer";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}

export default Layout;
