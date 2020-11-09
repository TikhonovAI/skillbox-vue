<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :filter-value.sync="filterValue" />

      <section class="catalog">

         <div id="cube-loader catalog__list" v-if="productsLoading"> Загружаем товары...
            <div class="caption">
              <div class="cube-loader">
                <div class="cube loader-1"></div>
                <div class="cube loader-2"></div>
                <div class="cube loader-4"></div>
                <div class="cube loader-3"></div>
              </div>
            </div>
          </div>

        <div v-else-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click="loadProducts">Попробуйте ещё раз</button></div>

        <ProductList :products="products" v-else/>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BAZE_URL } from '@/config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterValue: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      },

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({ ...product, image: product.image.file.url }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BAZE_URL}api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterValue.filterCategoryId,
            minPrice: this.filterValue.filterPriceFrom,
            maxPrice: this.filterValue.filterPriceTo,
            colorId: this.filterValue.filterColorId,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterValue() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
