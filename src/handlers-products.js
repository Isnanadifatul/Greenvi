const { nanoid } = require('nanoid');
const products = require('./products');

const addProductHandler = (request, h) => {
  // getting body request in Hapi with request.payload
  const { productName, category, price } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // property already complete, then push into array products
  const newProduct = {
    id, productName, category, price, insertedAt, updatedAt,
  };

  products.push(newProduct);

  // check if id are available
  const isIdFound = products.filter((product) => product.id === id).length > 0;

  // condition if product have added to array products
  if (isIdFound) {
    const response = h.response({
      status: 'success',
      message: 'product has been successfully added',
      data: {
        productId: id,
      },
    });
    response.code(201);
    return response;
  }

  // condition if product are not added to array products
  const response = h.response({
    status: 'fail',
    message: 'product failed to add',
  });
  response.code(500);
  return response;
};

const getAllProductsHandler = () => ({
  status: 'success',
  data: {
    products: products.map((product) => ({
      name: product.productName,
      category: product.category,
      price: product.price,
    })),
  },
});

const getProductByIdHandler = (request, h) => {
  // getting id from request parameter
  const { id } = request.params;

  // getting product object by id filtering
  const product = products.filter((p) => p.id === id)[0];

  // conditioning if there is product
  if (product !== undefined) {
    return {
      status: 'success',
      data: {
        product,
      },
    };
  }

  // response if product can not be found
  const response = h.response({
    status: 'fail',
    message: 'product can not be found!',
  });
  response.code(404);
  return response;
};

const editProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const { productName, category, price } = request.payload;
  const updatedAt = new Date().toISOString();

  // indexing array to update the product (catching the id)
  const index = products.findIndex((product) => product.id === id);

  // condition if index is true
  if (index !== -1) {
    products[index] = {
      ...products[index],
      productName,
      category,
      price,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'product has been successfully edited',
    });
    response.code(200);
    return response;
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to edit the product, id can\'t be found',
  });
  response.code(404);
  return response;
};

const deleteProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = products.findIndex((product) => product.id === id);

  // condition if index is available
  if (index !== -1) {
    products.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'product has been successfully deleted',
    });
    response.code(200);
    return response;
  }

  // response if fail
  const response = h.response({
    status: 'fail',
    message: 'failed to delete the product, id can\'t be found',
  });
  response.code(404);
  return response;
};

module.exports = {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
};
