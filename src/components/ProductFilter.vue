<template>
  <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price"
               v-model.number="currentFilterValue.filterPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price"
               v-model.number="currentFilterValue.filterPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category"
               v-model.number="currentFilterValue.filterCategoryId">
                <option value="0">Все категории</option>
                <option :value="category.id" v-for="category in categories"
                 :key="category.id">{{ category.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="color in colorList" :key="color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                   type="radio" name="color" :value="color.id"
                    v-model.number="currentFilterValue.filterColorId" checked="">
                  <span class="colors__value" :style="{ backgroundColor: color.code }">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                   type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                   type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                   type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import axios from 'axios';
import { API_BAZE_URL } from '@/config';

export default {
  data() {
    return {
      colorListData: null,
      categoriesData: null,

      currentFilterValue: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      },
    };
  },
  props: ['filterValue'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colorList() {
      return this.colorListData ? this.colorListData.items : [];
    },
  },
  watch: {
    filterValue(value) {
      this.currentFilterValue = value;
    },
  },
  methods: {
    getColorList() {
      axios.get(`${API_BAZE_URL}api/colors`)
        .then((response) => { this.colorListData = response.data; });
    },
    getCategoriesData() {
      axios.get(`${API_BAZE_URL}api/productCategories`)
        .then((response) => { this.categoriesData = response.data; });
    },
    submit() {
      this.$emit('update:filterValue', this.currentFilterValue);
    },
    reset() {
      this.$emit('update:filterValue', {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      });
    },
  },
  created() {
    this.getColorList();
    this.getCategoriesData();
  },
};
</script>
