<template>
  <div class="checkout">
    <h3>
      Carrinho
      <span class="totalItens" v-if="products.length > 0"
        >({{ products.length }} itens)</span
      >
    </h3>
    <div v-bind:class="getClassSection">
      <img v-if="products.length == 0" src="../assets/chart.svg" />
      <p class="title" v-if="products.length == 0">Até o momento,</p>
      <p class="title" v-if="products.length == 0">O seu carrinho está vazio</p>
      <div
        class="styleProduct"
        v-if="products.length > 0"
        v-for="product in products"
        :key="product.id"
      >
        <div class="containerImage">
          <img
            src="https://raw.githubusercontent.com/ConsultaRemedios/frontend-challenge/master/assets/shards-of-darkness.png"
            alt=""
          />
        </div>
        <div class="styleInfos">
          <p style="color: #7F7575;">{{ product.name }}</p>
          <p style="color: #423B3B;">R$ {{ product.price }}</p>
        </div>
        <div v-on:click="removeProduct(product.id)" class="deleteProduct">
          <img width="15" src="../assets/error.svg" />
        </div>
      </div>
    </div>
    <div class="footerCart" v-if="products.length > 0">
      <div class="subTotal">
        <span class="styleFontFooter">Subtotal</span>
        <span class="styleValue">R$ {{ calcSubTotal() }}</span>
      </div>
      <div class="frete">
        <span class="styleFontFooter">Frete</span>
        <span class="styleValue">R$ {{ calcFrete() }}</span>
      </div>
      <div class="cartTotal">
        <span class="styleFontFooter">Total</span>
        <span class="styleValue styleTotalValue">R$ {{ calcTotal() }}</span>
      </div>
      <button v-on:click="removeProduct" class="buttonFinish">
        Finalizar compra
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",

  computed: {
    products() {
      return this.$store.state.checkout.products;
    },
    getClassSection() {
      return this.products.length > 0 ? "contentProducts" : "section";
    }
  },
  methods: {
    calcFrete() {
      return this.calcSubTotal() > 250.0
        ? "00,00"
        : `${(this.products.length * 10.0).toFixed(2)}`;
    },
    calcSubTotal() {
      return this.products
        .reduce((sum, product) => {
          return sum + product.price;
        }, 0)
        .toFixed(2);
    },
    calcTotal() {
      return (
        parseInt(this.calcFrete()) + parseInt(this.calcSubTotal())
      ).toFixed(2);
    },
    removeProduct(id) {
      this.$store.commit("removeProduct", id);
    }
  }
};
</script>

<style>
.deleteProduct {
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.styleProduct:hover .deleteProduct {
  display: flex;
}
.styleTotalValue {
  font-size: 18px !important;
}
.styleValue {
  color: #423b3b;
  font-family: open sans;
  font-weight: 700;
  font-size: 14px;
}
.totalItens {
  color: #7f7575;
  font-size: 14px;
  font-family: open sans;
  font-weight: 400;
}
.styleFontFooter {
  color: #7f7575;
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 400;
}
.buttonFinish {
  height: 50px;
  background: #54a3ff;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  font-size: 14px;
  font-family: "Open Sans, Bold";
  cursor: pointer;
}
.footerCart {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 13px;
}

.footerCart div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.styleInfos {
  margin-left: 10px;
}

.nameProduct {
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 400;
  color: #7f7575;
}

.priceProduct {
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 400;
  color: #423b3b;
}

.styleProduct {
  cursor: pointer;
  margin-top: 2px;
  margin-left: 25px;
  width: 90%;
  display: flex;
  margin-bottom: 20px;
}

.containerImage {
  width: 60px;
  background: #eeeeee;
  height: 53px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.containerImage img {
  width: 70%;
}

.checkout {
  width: 262px;
  height: fit-content;
  min-height: 325px;
  max-height: 471px;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.checkout h3 {
  margin-left: 25px;
  margin-top: 19px;
  margin-bottom: 20px;
  font-family: "Open Sans, Bold";
  font-size: 18px;
  color: #363636;
}
.checkout .styleProduct p {
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 400;
  margin: 0;
}

.checkout .title {
  margin: 0;
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 14px;
  color: #746a6a;
}

.checkout .section {
  height: 82%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.checkout .contentProducts {
  max-height: 250px;
  overflow-y: scroll;
  flex: 1;
}
.checkout .section img {
  margin-bottom: 18px;
}
@media (max-width: 500px) {
  .checkout {
    display: none;
  }
}
</style>
