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

      <ProductList :products="productsToShow" />

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      products,
      filterValue: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      },
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterValue.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterValue.filterPriceFrom,
        );
      }

      if (this.filterValue.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterValue.filterPriceTo,
        );
      }

      if (this.filterValue.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryID === this.filterValue.filterCategoryId,
        );
      }

      if (this.filterValue.filterColorId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colors.includes(this.filterValue.filterColorId),
        );
      }
      return filteredProducts;
    },
    productsToShow() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
