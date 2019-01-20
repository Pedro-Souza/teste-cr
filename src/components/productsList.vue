<template>
  <div class="containerProducts">
    <div class="sectionHeader">
      <p class="titleHeader">Games</p>
      <select @change="changeFilter" v-model="selectFilter">
        <option class="styleSelect" selected="true" value="mostPop"
          >Mais Populares</option
        >
        <option class="styleSelect" value="lossPop">Menos populares</option>
        <option class="styleSelect" value="bigPrice">Maior preço</option>
        <option class="styleSelect" value="lowPrice">Menor preço</option>
        <option class="styleSelect" value="alfa">Ordem Alfabetica</option>
      </select>
    </div>
    <section class="row around-xs">
      <div
        class="product col-xs-6 col-md-4 col-sm-4 "
        v-for="product in products"
        :key="product.id"
        v-on:click="addProduct(product)"
      >
        <div class="content"><img :src="'static/'+product.image" /></div>
        <div class="infosProduct">
          <p class="nameGame">{{ product.name }}</p>
          <p class="priceGame">R$ {{ product.price }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "productsList",
  data: () => ({
    products: [],
    selectFilter: ""
  }),
  created() {
    axios
      .get(
        "https://raw.githubusercontent.com/ConsultaRemedios/frontend-challenge/master/products.json"
      )
      .then(res => {
        this.products = res.data;
      });
  },
  methods: {
    addProduct: function(product) {
      //this.$store.dispatch('checkout/setName', 'b')
      this.$store.commit("setName", product);
    },
    changeFilter: function() {
      if (this.selectFilter === "alfa") this.orderName();
      if (this.selectFilter === "mostPop") this.mostPop();
      if (this.selectFilter === "lossPop") this.lossPop();
      if (this.selectFilter === "bigPrice") this.bigPrice();
      if (this.selectFilter == "lowPrice") this.lowPrice();
    },
    orderName: function() {
      this.products = this.products.sort((prev, next) => {
        return prev.name.localeCompare(next.name);
      });
    },
    mostPop: function() {
      this.products = this.products.sort((prev, next) => {
        if (prev.score < next.score) {
          return 1;
        }
        if (prev.score > next.score) {
          return -1;
        }
        return 0;
      });
    },
    lossPop: function() {
      this.products = this.products.sort((prev, next) => {
        if (prev.score > next.score) {
          return 1;
        }
        if (prev.score < next.score) {
          return -1;
        }
        return 0;
      });
    },
    bigPrice: function() {
      this.products = this.products.sort((prev, next) => {
        if (prev.price < next.price) {
          return 1;
        }
        if (prev.price > next.price) {
          return -1;
        }
        return 0;
      });
    },
    lowPrice: function() {
      this.products = this.products.sort((prev, next) => {
        if (prev.price > next.price) {
          return 1;
        }
        if (prev.price < next.price) {
          return -1;
        }
        return 0;
      });
    }
  }
};
</script>

<style scoped>
.containerProducts {
  width: 70%;
}
.titleHeader {
  color: #363636;
  font-size: 48px;
  font-family: open sans;
  margin: 0;
}
.sectionHeader {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.infosProduct {
  margin-bottom: 40px;
}
.product:hover .infosProduct p {
  display: none;
}
.product:hover .infosProduct::after {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: "Open Sans, Bold";
  font-weight: bold;
  content: "Adicionar ao carrinho";
  color: #3487dc;
}
.product {
  cursor: pointer;
}
.product .content {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 60%;
  background-color: #eeeeee;
}

select {
  transition: border-color ease-in-out 0.15s;
  background: transparent;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  outline: 0;
  padding: 5px 25px 5px 5px;
  user-select: none;
  background: url(../assets/arrow.svg) no-repeat center right;
  height: 33px;
}

select *.styleSelect {
  border: 1px solid #e1e1e1;
  color: #423b3b;
  background: #ffffff;
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 14px;
}

.product .content img {
  max-width: 100%;
  max-height: 70%;
  width: 86%;
}

.product p {
  display: flex;
  margin: 0;
  justify-content: center;
}

.product .nameGame {
  margin-top: 10px;
  font-size: 16px;
  font-family: open sans;
  font-weight: 400;
  color: #746a6a;
}

.product .priceGame {
  color: #3486e6;
  font-size: 16px;
  font-family: open sans;
  font-weight: 600;
}

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media (max-width: 660px) {
  .containerProducts {
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .content {
    height: 230px !important;
    width: 260px;
  }
  .product .content img {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 1100px) and (min-width: 660px) {
  .containerProducts {
    width: 50%;
  }
}
</style>
