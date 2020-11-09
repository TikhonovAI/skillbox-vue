<template>
  <div class="content container" v-if="productLoading">Загрузка товара...
    <div class="caption">
              <div class="cube-loader">
                <div class="cube loader-1"></div>
                <div class="cube loader-2"></div>
                <div class="cube loader-4"></div>
                <div class="cube loader-3"></div>
              </div>
    </div>
  </div>
  <div class="content container" v-else-if="productLoadingFailed">Ошибка при загрузке</div>
   <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>

              <colorsList :itemColors="product.colors"/>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                     name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                     name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                     name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                 @click.prevent="decreaseProductAmount(productAmount)"
                  :disabled="(productAmount)<=1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар"
                 @click.prevent="increaseProductAmount(productAmount)">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="producrAddSending">
                В корзину
              </button>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="producrAddSending">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
            <h3>Беспроводная связь</h3>
            <p>Wi-Fi, Bluetooth 4.0, ANT+</p>

            <h3>Поддерживаемые спутники</h3>
            <p>GPS, ГЛОНАСС, BEIDOU Galileo и QZSS</p>

            <h3>Аккумулятор</h3>
            <p>перезаряжаемый USB</p>

            <h3>Время автономной работы</h3>
            <p>до 15 часов</p>

            <h3>Тип аккумулятора</h3>
            <p>литий-ионный</p>

            <h3>Водонепроницаемость</h3>
            <p>IPX7</p>

            <h3>Фирменное приложение</h3>
            <p>ELEMNT от Wahoo Fitness</p>

            <h3>Совместимость</h3>
            <p>iOS 9.0 и последующие, Android 4.3 и старше</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import axios from 'axios';
import { API_BAZE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import colorsList from '@/components/ColorList.vue';
import { mapActions } from 'vuex';

export default {
  components: { colorsList },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      producrAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addProductToCart', 'loadCart']),

    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.producrAddSending = true;

      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.producrAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BAZE_URL}api/products/${this.$route.params.id}`)
          .then((response) => { this.productData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 1000);
    },
    increaseProductAmount(value) {
      this.productAmount = value + 1;
    },
    decreaseProductAmount(value) {
      this.productAmount = value - 1;
    },
  },
  computed: {
    product() {
      return this.productData
        ? ({ ...this.productData, image: this.productData.image.file.url })
        : [];
    },
    category() {
      return this.productData ? this.productData.category : [];
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
