import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useLocalizedProduct } from "../features/products/productLocalization";
import { useProduct, useSubmitReview } from "../features/products/useProducts";

function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const content = useLocalizedProduct(product);
  const reviewMutation = useSubmitReview();
  const [review, setReview] = useState({
    reviewerName: "",
    rating: "5",
    comment: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (!review.reviewerName.trim() || !review.comment.trim()) return;

    reviewMutation.mutate(
      {
        productId: id,
        review: {
          ...review,
          rating: Number(review.rating),
        },
      },
      {
        onSuccess: () =>
          setReview({ reviewerName: "", rating: "5", comment: "" }),
      },
    );
  }

  if (isLoading) {
    return <p className="status">{t("details.loading")}</p>;
  }

  if (isError) {
    return <p className="status status--error">{error.message}</p>;
  }

  return (
    <article className="details-page">
      <Link className="back-link" to="/">
        {t("details.backToProducts")}
      </Link>

      <div className="details-layout">
        <div className="details-media">
          <img src={product.image} alt={content.title} />
        </div>

        <div className="details-copy">
          <span className="eyebrow">{product.brand ?? product.category}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>

          <div className="details-stats">
            <span>${product.price.toFixed(2)}</span>
            <span>
              {product.rating.toFixed(1)} {t("products.stars")}
            </span>
            <span>
              {product.stock} {t("products.inStock")}
            </span>
          </div>

          <button type="button" onClick={() => dispatch(addToCart(product))}>
            {t("buttons.addToCart")}
          </button>
        </div>
      </div>

      <section className="review-panel">
        <div>
          <span className="eyebrow">{t("reviews.mutation")}</span>
          <h2>{t("reviews.title")}</h2>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            value={review.reviewerName}
            onChange={(event) =>
              setReview((current) => ({
                ...current,
                reviewerName: event.target.value,
              }))
            }
            placeholder={t("reviews.yourName")}
          />
          <select
            value={review.rating}
            onChange={(event) =>
              setReview((current) => ({ ...current, rating: event.target.value }))
            }
          >
            <option value="5">5 {t("products.stars")}</option>
            <option value="4">4 {t("products.stars")}</option>
            <option value="3">3 {t("products.stars")}</option>
            <option value="2">2 {t("products.stars")}</option>
            <option value="1">1 {t("products.stars")}</option>
          </select>
          <textarea
            value={review.comment}
            onChange={(event) =>
              setReview((current) => ({ ...current, comment: event.target.value }))
            }
            placeholder={t("reviews.writeReview")}
            rows="4"
          />
          <button type="submit" disabled={reviewMutation.isPending}>
            {reviewMutation.isPending
              ? t("buttons.submitting")
              : t("buttons.submitReview")}
          </button>
          {reviewMutation.isSuccess && (
            <p className="success-note">{t("reviews.success")}</p>
          )}
        </form>

        <div className="reviews">
          {(product.reviews ?? []).map((item) => (
            <div className="review" key={item.id ?? item.comment}>
              <strong>{item.reviewerName}</strong>
              <span>
                {item.rating} {t("products.stars")}
              </span>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default ProductDetails;
