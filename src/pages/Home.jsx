import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductsList, { InfiniteProductsList } from "../components/ProductsList";
import { useProducts } from "../features/products/useProducts";

function Home() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
    useProducts(page, pageSize);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">{t("products.heroEyebrow")}</span>
        <h1>{t("products.heroTitle")}</h1>
        <p>{t("products.heroText")}</p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("products.pagination")}</span>
            <h2>{t("products.listTitle")}</h2>
          </div>
          <span className="cache-note">
            {isFetching && !isLoading
              ? t("products.refreshingCachedData")
              : t("products.cachedForFiveMinutes")}
          </span>
        </div>

        {isLoading && <p className="status">{t("products.loading")}</p>}
        {isError && <p className="status status--error">{error.message}</p>}

        {data && (
          <>
            <ProductsList products={data.products} />

            <div className="pagination">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
                disabled={page === 1}
              >
                {t("buttons.previous")}
              </button>
              <span>
                {t("products.page")} {page} / {totalPages}
                {isPlaceholderData
                  ? ` - ${t("products.showingCachedPage")}`
                  : ""}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                {t("buttons.next")}
              </button>
            </div>
          </>
        )}
      </section>

      <InfiniteProductsList />
    </>
  );
}

export default Home;
