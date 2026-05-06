import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useLocalizedProduct } from "../features/products/productLocalization";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const content = useLocalizedProduct(product);

  return (
    <article className="product-card">
      <Link className="product-card__media" to={`/products/${product.id}`}>
        <img src={product.image} alt={content.title} />
      </Link>

      <div className="product-card__body">
        <span className="eyebrow">{product.category}</span>
        <Link className="product-card__title" to={`/products/${product.id}`}>
          {content.title}
        </Link>
        <p>{content.description}</p>

        <div className="product-card__meta">
          <strong>${product.price.toFixed(2)}</strong>
          <span>
            {product.rating.toFixed(1)} {t("products.stars")}
          </span>
        </div>

        <button type="button" onClick={() => dispatch(addToCart(product))}>
          {t("buttons.addToCart")}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
