export default {
  state: {
    products: []
  },
  mutations: {
    addProduct(state, product) {
      state.products = [...state.products, product.value];
    },
    removeProduct(state, idProduct) {
      state.products = state.products.filter(product => {
        return idProduct.value != product.id;
      });
    }
  },
  actions: {
    addProduct: ({ commit }, value) => {
      commit({
        type: "addProduct",
        value
      });
    },
    removeProduct: ({ commit }, value) => {
      commit({
        type: "removeProduct",
        value
      });
    }
  },
  getters: {
    totalProducts: state => state.products.length,
    getProducts: state => state.products,
    calcSubTotal: state =>
      parseFloat(state.products
        .reduce((sum, product) => {
          return sum + product.price;
        }, 0))
        .toFixed(2),
    calcFrete: (state, getters) =>
      getters.calcSubTotal > 250.0
        ? "00,00"
        : `${(getters.totalProducts * 10.0).toFixed(2)}`,
    calcTotal: (state, getters) =>
      (
        parseFloat(getters.calcFrete) + parseFloat(getters.calcSubTotal)
      ).toFixed(2)
  }
};
