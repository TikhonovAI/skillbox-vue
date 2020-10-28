<template>
      <li>
            <a class="catalog__pic" href="#">
              <img :src="product.image" :alt="product.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ product.price }} ₽
            </span>

            <colorsList :itemColors="product.colors"/>
      </li>
</template>

<script>
import colorsList from './ColorList.vue';

export default {
  props: ['product'],
  components: { colorsList },
};
</script>
