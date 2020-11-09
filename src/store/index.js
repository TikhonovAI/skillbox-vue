import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BAZE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,

    cartProductsData: [],
    productsLoading: false,
    productsLoadingFailed: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((itemCheck) => itemCheck.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    updateProductsLoading(state, productsLoading) {
      state.productsLoading = productsLoading;
    },
    updateProductsLoadingFailed(state, productsLoadingFailed) {
      state.productsLoadingFailed = productsLoadingFailed;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailedProducts(state) {
      return state.cartProducts.map((item) => {
        const cartProduct = state.cartProductsData.find(
          (p) => p.product.id === item.productId,
        ).product;
        return {
          ...item,
          cartProduct,
          image: cartProduct.image.file.url,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailedProducts.reduce(
        (acc, item) => (item.cartProduct.price * item.amount) + acc, 0,
      );
    },
    productsLoading(state) {
      return state.productsLoading;
    },
    productsLoadingFailed(state) {
      return state.productsLoadingFailed;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('updateProductsLoading', true);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BAZE_URL}api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .catch(() => { context.commit('updateProductsLoadingFailed', true); })
          .then(() => { context.commit('updateProductsLoading', false); });
      }, 1000);
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BAZE_URL}api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return 0;
      }

      return axios.put(`${API_BAZE_URL}api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      return axios.delete(`${API_BAZE_URL}api/baskets/products`, {
        data: { productId },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
