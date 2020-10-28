<template>
      <li>
            <ul class="colors colors--black">
              <li class="colors__item" v-for="(itemColor, index) in itemColors" :key="index">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                  type="radio" :value="colorsLista(itemColor)" v-model="color">
                  <span class="colors__value"
                   v-bind:style="{ backgroundColor: colorsLista(itemColor) }">
                  </span>
                </label>
              </li>
            </ul>
      </li>
</template>

<script>
import colors from '../data/color';

export default {
  props: ['itemColors'],
  data() {
    return {
      color: '#73B6EA',
      styleObject: {
        backgroundColor: '#222',
        fontSize: '13px',
      },
    };
  },
  methods: {
    colorsListf(itemColors) {
      return itemColors;
    },
    colorsLista(item) {
      return colors.filter((someColor) => someColor.id === item).[0].value;
    },
  },
  computed: {
    newColor() {
      return colors;
    },
    addColor() {
      return colors.filter((someColor) => someColor.id === 2);
    },
  },
};
</script>
