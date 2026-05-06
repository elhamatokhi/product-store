import { useTranslation } from "react-i18next";
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
import { getLocalizedProduct } from "../../features/products/productLocalization";

function CartDrawer() {
  const { i18n, t } = useTranslation();
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
            <span className="eyebrow">{t("cart.shoppingCart")}</span>
            <h2>
              {itemCount} {t("cart.items")}
            </h2>
          </div>
          <button
            type="button"
            className="button-secondary"
            onClick={() => dispatch(closeCart())}
          >
            {t("buttons.close")}
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-state">{t("cart.empty")}</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => {
                const content = getLocalizedProduct(
                  item,
                  i18n.resolvedLanguage ?? i18n.language,
                );

                return (
                  <article className="cart-item" key={item.id}>
                    <img src={item.image} alt={content.title} />
                    <div className="cart-item__copy">
                      <h3>{content.title}</h3>
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
                          {t("buttons.remove")}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="cart-summary">
              <div>
                <span>{t("cart.totalPrice")}</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" onClick={() => dispatch(clearCart())}>
                {t("buttons.clearCart")}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
