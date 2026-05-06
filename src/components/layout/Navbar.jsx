import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/cart/cartSlice";

function Navbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Product Store
      </Link>
      <nav>
        <NavLink to="/">Products</NavLink>
        <span className="cart-pill">Cart {cartCount}</span>
      </nav>
    </header>
  );
}

export default Navbar;
