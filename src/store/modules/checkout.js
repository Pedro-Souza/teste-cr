export default {
  state: {
    products: []
  },
  mutations: {
    setName(state, product) {
      state.products = [...state.products, product];
    },
    removeProduct(state, idProduct) {
      state.products = state.products.filter(product => {
        return idProduct != product.id;
      });
    }
  },
  getters: {
    totalValue: state => {
      return state.products.length;
    }
  }
};
