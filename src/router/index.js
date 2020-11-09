import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import CartPage from '@/pages/CartPage.vue';
// import products from '@/data/products';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

/*  router.beforeEach((to, from, next) => {
  if (to.params.id) {
    if (!products.find((product) => product.id === to.params.id)) {
      next({ path: '/notFound' });
    } else next();
  } else next();
}); */

export default router;
