import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProductPage,
  getProducts,
  submitProductReview,
} from "./productsApi";

const PRODUCT_PAGE_SIZE = 8;

// Centralized query key management.
export const productKeys = {
  // Base query key for all product queries
  all: ["products"],

  // Query key for all product lists
  lists: () => [...productKeys.all, "list"],

  // Query key for paginated product list
  list: (page, limit = PRODUCT_PAGE_SIZE) => [
    ...productKeys.lists(),
    { page, limit },
  ],

  // Query key for infinite scrolling products
  infinite: (limit = PRODUCT_PAGE_SIZE) => [
    ...productKeys.lists(),
    "infinite",
    { limit },
  ],

  // Query key for parent key for product details
  details: () => [...productKeys.all, "detail"],

  // // Query key for single product details
  detail: (id) => [...productKeys.details(), String(id)],
};

//Fetche paginated products.
export function useProducts(page = 1, limit = PRODUCT_PAGE_SIZE) {
  return useQuery({
    queryKey: productKeys.list(page, limit), // Unique cache key for this page
    queryFn: () => getProducts({ page, limit }), // fetch paginated products
    placeholderData: keepPreviousData, // keep old data while loading next page
    staleTime: 1000 * 60 * 5, // cache stays fresh for 5 minutes
  });
}
// Handles infinite scrolling
export function useInfiniteProducts(limit = PRODUCT_PAGE_SIZE) {
  return useInfiniteQuery({
    // Cache key for infinite products
    queryKey: productKeys.infinite(limit), 

    // Fetch next page of products
    queryFn: ({ pageParam }) => getProductPage({ pageParam, limit }),

    // Starting skip value
    initialPageParam: 0,

    // Determine next page offset
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;

     // Stop if all products are loaded
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
   // Cache freshness duration
    staleTime: 1000 * 60 * 5,
  });
}

// Fetches single product details
export function useProduct(id) {
  return useQuery({
    // Unique cache key per product
    queryKey: productKeys.detail(id),
     // Fetch product details
    queryFn: () => getProduct(id),
    // Only fetch if ID exists
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

//Mutation hook
export function useSubmitReview() {
  // Access React Query cache.
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation request function
    mutationFn: submitProductReview,

    // Runs after successful mutation
    onSuccess: (review) => {
      queryClient.setQueryData(
        productKeys.detail(review.productId),

        // Update cached product data
        (product) => {
          if (!product) return product;

          return {
            ...product,

            // Add new review to reviews array
            reviews: [
              review, 
              ...(product.reviews ?? [])],
          };
        });
    },
  });
}
