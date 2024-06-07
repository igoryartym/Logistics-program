// store.js
export const store = {
  orders: [],
  addOrder(order) {
    this.orders.push(order);
  },
  getOrders() {
    return this.orders;
  },
};
