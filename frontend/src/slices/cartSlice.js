import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // Calculat items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate Shipping price : if items price > 100$ then free, else 10$ shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price: 15% tax
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== item);

      // Calculat items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate Shipping price : if items price > 100$ then free, else 10$ shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price: 15% tax
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // Calculat items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate Shipping price : if items price > 100$ then free, else 10$ shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price: 15% tax
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      // Calculat items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate Shipping price : if items price > 100$ then free, else 10$ shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price: 15% tax
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      // Calculat items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate Shipping price : if items price > 100$ then free, else 10$ shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price: 15% tax
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
