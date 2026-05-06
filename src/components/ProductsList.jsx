import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { useInfiniteProducts } from "../features/products/useProducts";

function ProductsList({ products = [] }) {
  const { t } = useTranslation();

  if (!products.length) {
    return <p className="empty-state">{t("products.noProducts")}</p>;
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
  const { t } = useTranslation();
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
    return <p className="status">{t("products.loadingMore")}</p>;
  }

  if (isError) {
    return <p className="status status--error">{error.message}</p>;
  }

  const products = data.pages.flatMap((page) => page.products);

  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("products.infiniteScroll")}</span>
          <h2>{t("products.keepBrowsing")}</h2>
        </div>
        <span className="cache-note">{t("products.cachedInfiniteQuery")}</span>
      </div>

      <ProductsList products={products} />

      <div ref={loadMoreRef} className="load-more">
        {isFetchingNextPage
          ? t("products.loadingNextPage")
          : hasNextPage
            ? t("products.scrollForMore")
            : t("products.allLoaded")}
      </div>
    </section>
  );
}

export default ProductsList;
