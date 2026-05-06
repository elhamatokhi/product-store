import { useState } from "react";
import ProductsList, { InfiniteProductsList } from "../components/ProductsList";
import { useProducts } from "../features/products/useProducts";

function Home() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
    useProducts(page, pageSize);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">React Query store</span>
        <h1>Products fetched, cached, paged, and ready to inspect.</h1>
        <p>
          Product data comes from DummyJSON with stable query keys, cached pages,
          detail queries, infinite scroll, and a mock review mutation.
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Pagination</span>
            <h2>Product list from API</h2>
          </div>
          <span className="cache-note">
            {isFetching && !isLoading ? "Refreshing cached data..." : "Cached for 5 minutes"}
          </span>
        </div>

        {isLoading && <p className="status">Loading products...</p>}
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
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
                {isPlaceholderData ? " - showing cached page" : ""}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
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
