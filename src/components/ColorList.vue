<template>
      <li>
            <ul class="colors colors--black">
              <li class="colors__item" v-for="(itemColor, index) in itemColors" :key="index">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                  type="radio" :value="itemColor.code" v-model="color">
                  <span class="colors__value"
                   v-bind:style="{ backgroundColor: itemColor.code }">
                  </span>
                </label>
              </li>
            </ul>
      </li>
</template>

<script>
export default {
  props: ['itemColors'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
};
</script>
