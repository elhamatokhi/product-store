import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useInfiniteProducts } from "../features/products/useProducts";

function ProductsList({ products = [] }) {
  if (!products.length) {
    return <p className="empty-state">No products found.</p>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function InfiniteProductsList() {
  const loadMoreRef = useRef(null);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(6);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <p className="status">Loading more products...</p>;
  }

  if (isError) {
    return <p className="status status--error">{error.message}</p>;
  }

  const products = data.pages.flatMap((page) => page.products);

  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Infinite scroll</span>
          <h2>Keep browsing</h2>
        </div>
        <span className="cache-note">Cached with query key: products/list/infinite</span>
      </div>

      <ProductsList products={products} />

      <div ref={loadMoreRef} className="load-more">
        {isFetchingNextPage
          ? "Loading next page..."
          : hasNextPage
            ? "Scroll for more"
            : "All products loaded"}
      </div>
    </section>
  );
}

export default ProductsList;
