// Base URL for all product API requests
const API_URL = "https://dummyjson.com/products";

// Transform the raw API product into a cleaner and more consistent product object.
function normalizeProduct(product) {
  return {
    ...product,
    image: product.thumbnail,
    category: product.category ?? "uncategorized",
    rating: product.rating ?? 0,
  };
}
// Normalize ALL products inside the API response
function normalizeProductsResponse(data) {
  return {
    ...data, // Keep original response data
    products: data.products.map(normalizeProduct), // Normalize every product object
  };
}

// Error handling and response conversion to JSON
async function readJson(res, message) {
  // Throw error if request fails
  if (!res.ok) {
    throw new Error(message);
  }

  return res.json();
}

// Fetch paginated products
export async function getProducts({ page = 1, limit = 8 } = {}) {
  // Calculate how many products to skip
  const skip = (page - 1) * limit;

  // Fetch paginated products
  const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);

  // Validate and parse response
  const data = await readJson(res, "Failed to fetch products");

  // Normalize API response
  return normalizeProductsResponse(data);
}

// Fetch one product by ID
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await readJson(res, "Failed to fetch product details");

  return normalizeProduct(data);
}

// Infinite scrollling
export async function getProductPage({ pageParam = 0, limit = 8 } = {}) {
  const res = await fetch(`${API_URL}?limit=${limit}&skip=${pageParam}`);
  const data = await readJson(res, "Failed to fetch more products");

  return normalizeProductsResponse(data);
}

// Simulate submitting a review to the server.
export async function submitProductReview({ productId, review }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 450));

  // Return mock review object
  return {
    id: crypto.randomUUID(),
    productId,
    rating: review.rating,
    comment: review.comment.trim(),
    reviewerName: review.reviewerName.trim(),
    date: new Date().toISOString(),
  };
}
