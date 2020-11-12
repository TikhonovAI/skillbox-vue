<template>
  <div class="header__cart" v-if="this.productsLoading">
       <div class="caption">
              <div class="cube-loader-header">
                <div class="cube loader-1"></div>
                <div class="cube loader-2"></div>
                <div class="cube loader-4"></div>
                <div class="cube loader-3"></div>
              </div>
      </div>
    </div>

    <div class="header__cart" v-else-if="this.productsLoadingFailed">
    Ошибка при загрузке</div>

  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}" v-else>
          <svg width="30" height="21" fill="currentColor">
            <use xlink:href="#icon-cart"></use>
          </svg>
          <span class="header__count" aria-label="Количество товаров">
            {{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['productsLoading', 'productsLoadingFailed']),
  },
};
</script>
