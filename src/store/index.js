import Vue from "vue";
import Vuex from "vuex";

import checkout from "./modules/checkout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    checkout: checkout
  }
});
