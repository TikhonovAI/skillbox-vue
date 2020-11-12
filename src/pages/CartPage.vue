<template>
  <main class="content container">
    <div class="content__top" >
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ this.cartDetailedProducts.length }} товара
      </span>
    </div>

     <div class="cart" v-if="this.productsLoading">Загрузка товара...
       <div class="caption">
              <div class="cube-loader">
                <div class="cube loader-1"></div>
                <div class="cube loader-2"></div>
                <div class="cube loader-4"></div>
                <div class="cube loader-3"></div>
              </div>
      </div>
    </div>

    <div class="cart" v-else-if="this.productsLoadingFailed">
    Ошибка при загрузке</div>

    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in this.cartDetailedProducts" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ this.cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
           class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  components: {
    CartItem,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['cartDetailedProducts', 'cartTotalPrice', 'productsLoading', 'productsLoadingFailed']),
  },
};
</script>
