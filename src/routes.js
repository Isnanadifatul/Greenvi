const {registerHandler} = require('./handlers-register');
const { loginHandler } = require('./handlers-login');

const {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
} = require('./handlers-products');

const {
  addStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  editStoreByIdHandler,
  deleteStoreByIdHandler,
} = require('./handlers-stores');


  
const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'GET',
    path: '/register',
    handler: (request, h) => h.view('register'),
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'GET',
    path: '/login',
    handler: (request, h) => h.view('login'),
  },
  {
    method: 'POST',
    path: '/products',
    handler: addProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: deleteProductByIdHandler,
  },
  {
    method: 'POST',
    path: '/stores',
    handler: addStoreHandler,
  },
  {
    method: 'GET',
    path: '/stores',
    handler: getAllStoresHandler,
  },
  {
    method: 'GET',
    path: '/stores/{id}',
    handler: getStoreByIdHandler,
  },
  {
    method: 'PUT',
    path: '/stores/{id}',
    handler: editStoreByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/stores/{id}',
    handler: deleteStoreByIdHandler,
  },
];

module.exports = routes;
