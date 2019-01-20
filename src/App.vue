<template>
  <div id="app">
    <div class="container"><productsList /> <checkout /></div>
  </div>
</template>

<script>
import productsList from "@/components/productsList.vue";
import checkout from "@/components/checkout.vue";
export default {
  name: "app",
  components: {
    productsList,
    checkout
  }
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css);
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i");
.container {
  margin: 30px auto;
  width: 90%;
  display: flex;
  justify-content: space-around;
}
body {
  margin: 0;
}
@media (min-width: 1280px) {
  .container {
    width: 1280px;
  }
}
</style>
