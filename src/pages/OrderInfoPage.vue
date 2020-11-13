<template>
   <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="orderInfo">
        Заказ оформлен <span>№ {{ this.orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <div class="cart__form form" v-if="this.productsLoading">Загрузка данных о заказе...
            <div class="caption">
                    <div class="cube-loader">
                      <div class="cube loader-1"></div>
                      <div class="cube loader-2"></div>
                      <div class="cube loader-4"></div>
                      <div class="cube loader-3"></div>
                    </div>
            </div>
          </div>

          <div class="cart__form form" v-else-if="this.productsLoadingFailed">
          Ошибка при загрузке</div>

      <form class="cart__form form" action="#" method="POST" v-else>
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;
            Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary" v-if="this.orderInfo">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-if="this.orderInfo">
            <OrderCartItem v-for="item in this.orderInfo.basket.items"
             :key="item.id" :item="item.product" :amount="item.quantity"/>
          </ul>

          <div class="cart__total" v-if="this.orderInfo">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ this.orderInfo.basket.items.length }}</b> товара на сумму <b>
              {{ this.orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderCartItem from '@/components/OrderCartItem.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { OrderCartItem },
  filters: {
    numberFormat,
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  computed: {
    ...mapGetters(['orderInfo', 'productsLoading', 'productsLoadingFailed']),
  },
};
</script>
