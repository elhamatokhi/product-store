import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useProduct, useSubmitReview } from "../features/products/useProducts";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError, error } = useProduct(id);
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
    return <p className="status">Loading product details...</p>;
  }

  if (isError) {
    return <p className="status status--error">{error.message}</p>;
  }

  return (
    <article className="details-page">
      <Link className="back-link" to="/">
        Back to products
      </Link>

      <div className="details-layout">
        <div className="details-media">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-copy">
          <span className="eyebrow">{product.brand ?? product.category}</span>
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <div className="details-stats">
            <span>${product.price.toFixed(2)}</span>
            <span>{product.rating.toFixed(1)} stars</span>
            <span>{product.stock} in stock</span>
          </div>

          <button type="button" onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
        </div>
      </div>

      <section className="review-panel">
        <div>
          <span className="eyebrow">Mutation</span>
          <h2>Submit a mock review</h2>
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
            placeholder="Your name"
          />
          <select
            value={review.rating}
            onChange={(event) =>
              setReview((current) => ({ ...current, rating: event.target.value }))
            }
          >
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
          <textarea
            value={review.comment}
            onChange={(event) =>
              setReview((current) => ({ ...current, comment: event.target.value }))
            }
            placeholder="Write a short review"
            rows="4"
          />
          <button type="submit" disabled={reviewMutation.isPending}>
            {reviewMutation.isPending ? "Submitting..." : "Submit review"}
          </button>
          {reviewMutation.isSuccess && (
            <p className="success-note">Review added to the cached product detail.</p>
          )}
        </form>

        <div className="reviews">
          {(product.reviews ?? []).map((item) => (
            <div className="review" key={item.id ?? item.comment}>
              <strong>{item.reviewerName}</strong>
              <span>{item.rating} stars</span>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default ProductDetails;
