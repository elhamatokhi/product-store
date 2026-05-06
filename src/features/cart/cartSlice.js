import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    isOpen: false,
  },

  reducers: {
    addToCart: {
      reducer(state, action) {
        const p = action.payload;
        const existing = state.items.find((x) => x.productId === p.productId);

        if (existing) {
          existing.qty += 1;
        } else {
          state.items.push(p);
        }
      },

      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 1,
          },
        };
      },
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    incQty(state, action) {
      const id = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (item) {
        item.qty += 1;
      }
    },
    decQty(state, action) {
      const id = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (!item) return;

      item.qty -= 1;
      if (item.qty <= 0) {
        state.items = state.items.filter((x) => x.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  openCart,
  closeCart,
  toggleCart,
  incQty,
  decQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.qty, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.price * x.qty, 0);
