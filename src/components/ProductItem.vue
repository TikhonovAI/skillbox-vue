<template>
      <li>
            <a class="catalog__pic" href="#"
            @click.prevent="gotoPage('product', {id:product.id})">
              <img :src="product.image" :alt="product.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
            </span>

            <colorsList :itemColors="product.colors"/>
      </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import colorsList from '@/components/ColorList.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  components: { colorsList },
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
};
</script>
