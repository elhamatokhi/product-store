import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link className="product-card__media" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>

      <div className="product-card__body">
        <span className="eyebrow">{product.category}</span>
        <Link className="product-card__title" to={`/products/${product.id}`}>
          {product.title}
        </Link>
        <p>{product.description}</p>

        <div className="product-card__meta">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.rating.toFixed(1)} stars</span>
        </div>

        <button type="button" onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
