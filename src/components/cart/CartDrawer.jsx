import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  closeCart,
  decQty,
  incQty,
  removeFromCart,
  selectCartCount,
  selectCartIsOpen,
  selectCartItems,
  selectCartTotal,
} from "../../features/cart/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? "cart-backdrop--open" : ""}`}
        onClick={() => dispatch(closeCart())}
      />
      <aside className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <div>
            <span className="eyebrow">Shopping cart</span>
            <h2>{itemCount} items</h2>
          </div>
          <button
            type="button"
            className="button-secondary"
            onClick={() => dispatch(closeCart())}
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-state">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item__copy">
                    <h3>{item.title}</h3>
                    <span>${item.price.toFixed(2)}</span>
                    <div className="cart-item__actions">
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => dispatch(decQty(item.id))}
                      >
                        -
                      </button>
                      <strong>{item.qty}</strong>
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => dispatch(incQty(item.id))}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="button-link"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Total price</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" onClick={() => dispatch(clearCart())}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
