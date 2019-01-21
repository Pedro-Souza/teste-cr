import store from "@/store";

describe("testando checkout", () => {
  it("testando a adicação de novo produtos ao checkout", () => {
    const product = {
      id: 312,
      name: "Super Mario Odyssey",
      price: 197.88,
      score: 100,
      image: "super-mario-odyssey.png"
    };
    store.dispatch("addProduct", product);
    expect(store.getters["totalProducts"]).toEqual(1);
  });

  it("testando remoção dos produtos", () => {
    store.dispatch("addProduct", {
      id: 201,
      name: "Call Of Duty Infinite Warfare",
      price: 49.99,
      score: 80,
      image: "call-of-duty-infinite-warfare.png"
    });
    store.dispatch("removeProduct", 201);
    expect(store.getters["totalProducts"]).toEqual(1);
  });

  it("testando valores do frete com acrescimo", () => {
    expect(store.getters["calcSubTotal"]).toEqual("197.88");
    expect(store.getters["calcFrete"]).toEqual("10.00");
    expect(store.getters["calcTotal"]).toEqual("207.88");
  });
  it("testando valores acima de 250", () => {
    store.dispatch("addProduct", {
      id: 102,
      name: "The Witcher III Wild Hunt",
      price: 119.5,
      score: 250,
      image: "the-witcher-iii-wild-hunt.png"
    });
    expect(store.getters["calcSubTotal"]).toEqual("317.38");
    expect(store.getters["calcFrete"]).toEqual("00,00");
    expect(store.getters["calcTotal"]).toEqual("317.38");
  });
});
