import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, toggleCart } from "../../features/cart/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Product Store
      </Link>
      <nav>
        <NavLink to="/">Products</NavLink>
        <button
          type="button"
          className="cart-pill"
          onClick={() => dispatch(toggleCart())}
        >
          Cart {cartCount}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
