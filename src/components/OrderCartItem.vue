<template>
   <li class="cart__order">
    <h3>{{ item.title }}</h3>
    <b>{{ (item.price * amount) | numberFormat }} ₽</b>
    <span>Артикул: {{ item.id }}</span>
   </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  props: ['item', 'amount'],
};
</script>
