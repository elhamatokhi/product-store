import { createSlice, nanoid } from "@reduxjs/toolkit";
const loadCart = () => {
    try {
        const data = localStorage.getItem('cart')
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    isOpen: false
  },

  reducers: {
    addToCart: {
      // Reducer: handles how state changes
      reducer(state, action) {
        const p = action.payload;
        // The prepared product data (already structured in prepare)

        const existing = state.items.find((x) => x.productId === p.productId);
        // Check if this product is already in the cart
        // We compare using productId (not id, since id is unique per cart item)

        if (existing) {
          existing.qty += 1;
          // If product already exists → increase quantity
        } else {
          state.items.push(p);
          // If not → add new item to cart
        }
      },

      // Prepare: runs BEFORE reducer
      // Used to shape/transform the data before it reaches reducer
      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            // Unique ID for THIS cart item

            productId: product.id,
            // Original product ID (used to check duplicates)

            title: product.title,
            price: product.price,
            image: product.image,
            // Copy relevant product data into cart

            qty: 1,
            // Default quantity when first added
          },
        };
      },
    },
    removeFromCart(state, action) {
        const id = action.payload
        state.items = state.items.filter((x) => x.id !== id)
    },
    toggleCart(state){
      state.isOpen = !state.isOpen  
    },
    incQty(state, action) {
        const id = action.payload
        const item = state.items.find((x) => x.id == id)
        if(item) 
            item.qty += 1
    },
    decQty(state, action) {
        const id = action.payload
        const item = state.items.find((x) => x.id == id)
        if (!item)
            return
        item.qty -= 1

        if(item.qty <= 0)
            state.items = state.items.filter((x)=> x.id !== id)
    },
    clearCart(state) {
        state.items = []
    },
  },
});

export const {addToCart,removeFromCart, toggleCart, incQty, decQty, clearCart} = cartSlice.actions
export default cartSlice.reducer

export const selectCartCount = (state) => state.cart.items.reduce((sum, x) => sum + x.qty, 0)
export const selectCartTotal = (state) => state.cart.items.reduce((sum, x) => sum + x.price * x.qty, 0)